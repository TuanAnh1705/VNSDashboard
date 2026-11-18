import {
  Plugin,
  Widget,
  toWidget,
  createDropdown,
  addListToDropdown,
  Collection,
  UIModel,
  type ListDropdownItemDefinition,
  type ModelElement,
  type ViewDowncastWriter,
} from 'ckeditor5';

/**
 * Nút "CTA Box" trong CKEditor (port từ strapi-cns) — chèn một khung `Article CTA Box`
 * vào BẤT KỲ chỗ nào trong thân bài (BlogDetail › BlogContent).
 *
 * Bài chỉ giữ một thẻ đánh dấu:
 *
 *     <div class="article-cta" data-cta="vns-default-box"></div>
 *
 * còn nội dung (eyebrow, tiêu đề, mô tả, nút, link, variant box/bar) sống trong collection
 * `article-cta`. Frontend (VietNamSourcing, qua vns-core) đọc `data-cta`, gọi
 * `/api/article-ctas` và dựng khung tại đúng vị trí đó. Sửa một khung là mọi bài đang
 * chèn nó đổi theo.
 *
 * Trong editor, thẻ đánh dấu hiện thành widget xem trước (màu theo variant);
 * kéo/xoá/cắt dán như một khối ảnh.
 */

export interface ArticleCta {
  slug: string;
  name: string;
  variant: 'box' | 'bar';
  eyebrow: string | null;
  heading: string;
  description: string | null;
  buttonLabel: string | null;
}

const MODEL = 'articleCta';
const ATTR = 'ctaSlug';
const STYLE_ID = 'vns-article-cta-editor-style';

/** Bộ nhớ đệm dùng chung cho mọi editor trên trang (một bài có thể có 2 ô CKEditor). */
const cache = new Map<string, ArticleCta>();
/** Dấu vân tay của lần tải gần nhất — để biết danh sách có THẬT SỰ đổi không. */
let signature = '';
let loading: Promise<boolean> | null = null;

/**
 * Mọi khung xem trước đang có trên trang. Tải xong danh sách thì vẽ lại thẳng
 * những DOM này, KHÔNG đi qua `editing.reconvertItem` — hàm đó chạy một
 * `model.change`, bắn `change:data` và đánh dấu bài là "đã sửa" dù không ai sửa gì.
 */
const previews = new Map<HTMLElement, string>();

function rerenderPreviews() {
  for (const [dom, slug] of previews) {
    if (!dom.isConnected) previews.delete(dom);
    else renderPreview(dom, slug);
  }
}

function backendUrl(): string {
  const w = window as unknown as { strapi?: { backendURL?: string } };
  return (w.strapi?.backendURL ?? '').replace(/\/$/, '');
}

/** Trả `true` khi danh sách khác lần trước (lần đầu tải thành công cũng tính). */
async function loadCtas(force = false): Promise<boolean> {
  if (loading && !force) return loading;
  loading = (async () => {
    try {
      const res = await fetch(
        `${backendUrl()}/api/article-ctas?pagination[pageSize]=200&sort=name:asc`,
        { credentials: 'omit' }
      );
      if (!res.ok) return false;
      const json = (await res.json()) as { data?: ArticleCta[] };
      const rows = (json.data ?? []).filter((row) => row.slug);
      const next = JSON.stringify(
        rows.map((r) => [r.slug, r.name, r.variant, r.eyebrow, r.heading, r.description, r.buttonLabel])
      );
      if (next === signature) return false;
      signature = next;
      cache.clear();
      for (const row of rows) cache.set(row.slug, row);
      rerenderPreviews();
      return true;
    } catch {
      // Mất mạng / chưa cấp quyền Public: widget vẫn hiện slug, chỉ thiếu xem trước.
      return false;
    }
  })();
  return loading;
}

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
.ck-content .vns-cta{margin:1em 0;font-family:'SVN-Gilroy Regular',system-ui,sans-serif}
.vns-cta__box{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:center;border:1px solid #e5e7eb;border-radius:0}
.vns-cta__box[data-variant="box"]{background:#f2f2eb;color:#2a4233;padding:24px 28px}
.vns-cta__box[data-variant="bar"]{background:#fafaf8;color:#161616;padding:12px 12px 12px 20px}
.vns-cta__text{flex:1 1 240px;min-width:0}
.vns-cta__badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:2px 8px;margin-bottom:6px;background:rgba(244,202,104,.35);color:#2a4233}
.vns-cta__eyebrow{font-size:14px;color:#2a4233;margin-bottom:4px}
.vns-cta__eyebrow::before{content:"";display:inline-block;width:11px;height:12px;margin-right:8px;background:#f4ca68;clip-path:polygon(35% 0,100% 0,65% 100%,0 100%)}
.vns-cta__heading{font-size:18px;font-weight:700;line-height:1.35}
.vns-cta__box[data-variant="bar"] .vns-cta__heading{font-size:15px}
.vns-cta__desc{margin-top:4px;font-size:13px;line-height:1.55;color:#333}
.vns-cta__btn{flex-shrink:0;font-size:13px;font-weight:700;padding:10px 18px;border:1px solid #2a4233;color:#2a4233;white-space:nowrap}
.vns-cta__box[data-variant="bar"] .vns-cta__btn{padding:7px 12px}
.vns-cta__box[data-variant="missing"]{background:#FFF4F2;border:1px dashed #E0A497;color:#8A2E1C;font-size:13px;padding:14px 18px}
`;
  document.head.appendChild(style);
}

/** Dựng phần xem trước bằng DOM API (textContent) — không bao giờ nhét HTML thô. */
function renderPreview(dom: HTMLElement, slug: string) {
  dom.textContent = '';
  const cta = cache.get(slug);
  const box = document.createElement('div');
  box.className = 'vns-cta__box';

  if (!cta) {
    box.dataset.variant = 'missing';
    box.textContent = `CTA Box "${slug}" — không tìm thấy (đã bị xoá, hoặc danh sách chưa tải xong).`;
    dom.appendChild(box);
    return;
  }

  box.dataset.variant = cta.variant === 'bar' ? 'bar' : 'box';
  const text = document.createElement('div');
  text.className = 'vns-cta__text';

  const badge = document.createElement('div');
  badge.className = 'vns-cta__badge';
  badge.textContent = `CTA Box · ${cta.variant === 'bar' ? 'Bar (thanh gọn)' : 'Box (khung lớn)'}`;
  const heading = document.createElement('div');
  heading.className = 'vns-cta__heading';
  heading.textContent = cta.heading;
  text.appendChild(badge);
  if (cta.eyebrow && cta.variant !== 'bar') {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'vns-cta__eyebrow';
    eyebrow.textContent = cta.eyebrow;
    text.appendChild(eyebrow);
  }
  text.appendChild(heading);

  if (cta.description && cta.variant !== 'bar') {
    const desc = document.createElement('div');
    desc.className = 'vns-cta__desc';
    desc.textContent = cta.description;
    text.appendChild(desc);
  }
  box.appendChild(text);

  if (cta.buttonLabel) {
    const btn = document.createElement('span');
    btn.className = 'vns-cta__btn';
    btn.textContent = cta.buttonLabel;
    box.appendChild(btn);
  }
  dom.appendChild(box);
}

export class ArticleCtaPlugin extends Plugin {
  static get requires() {
    return [Widget] as const;
  }

  static get pluginName() {
    return 'ArticleCta' as const;
  }

  init() {
    const editor = this.editor;
    injectStyles();

    editor.model.schema.register(MODEL, {
      inheritAllFrom: '$blockObject',
      allowAttributes: [ATTR],
    });

    // HTML → model. `high` để thắng General HTML Support (preset cho phép mọi
    // thẻ div), không thì GHS nuốt thẻ thành một div thường.
    editor.conversion.for('upcast').elementToElement({
      view: { name: 'div', attributes: { 'data-cta': true } },
      model: (viewEl, { writer }) =>
        writer.createElement(MODEL, { [ATTR]: String(viewEl.getAttribute('data-cta') ?? '') }),
      converterPriority: 'high',
    });

    // Model → HTML lưu vào DB: chỉ thẻ đánh dấu.
    editor.conversion.for('dataDowncast').elementToElement({
      model: { name: MODEL, attributes: [ATTR] },
      view: (modelEl: ModelElement, { writer }: { writer: ViewDowncastWriter }) =>
        writer.createContainerElement('div', {
          class: 'article-cta',
          'data-cta': String(modelEl.getAttribute(ATTR) ?? ''),
        }),
    });

    // Model → vùng soạn thảo: widget có xem trước.
    editor.conversion.for('editingDowncast').elementToElement({
      model: { name: MODEL, attributes: [ATTR] },
      view: (modelEl: ModelElement, { writer }: { writer: ViewDowncastWriter }) => {
        const slug = String(modelEl.getAttribute(ATTR) ?? '');
        const container = writer.createContainerElement('div', { class: 'vns-cta' });
        const raw = writer.createRawElement('div', {}, (dom) => {
          previews.set(dom, slug);
          renderPreview(dom, slug);
        });
        writer.insert(writer.createPositionAt(container, 0), raw);
        return toWidget(container, writer, { label: 'CTA Box' });
      },
    });

    // Tải danh sách; xong thì `loadCtas` tự vẽ lại các khung xem trước.
    void loadCtas();

    editor.ui.componentFactory.add('articleCta', (locale) => {
      const dropdown = createDropdown(locale);
      dropdown.buttonView.set({
        label: 'CTA Box',
        withText: true,
        tooltip: 'Chèn khung CTA (tạo khung ở Content Manager › Article CTA Box)',
      });

      const items = new Collection<ListDropdownItemDefinition>();
      /** Danh sách đang hiển thị được dựng từ phiên bản dữ liệu nào. */
      let filledFrom: string | null = null;
      const fill = () => {
        filledFrom = signature;
        items.clear();
        if (cache.size === 0) {
          items.add({
            type: 'button',
            model: new UIModel({
              label: 'Chưa có khung nào — tạo ở Content Manager › Article CTA Box',
              withText: true,
              isEnabled: false,
            }),
          });
          return;
        }
        for (const cta of cache.values()) {
          items.add({
            type: 'button',
            model: new UIModel({
              label: `${cta.name}  ·  ${cta.variant === 'bar' ? 'Bar' : 'Box'}`,
              withText: true,
              ctaSlug: cta.slug,
            }),
          });
        }
      };
      fill();
      addListToDropdown(dropdown, items);

      // Mỗi lần mở dropdown thì tải lại — khung vừa tạo ở tab khác hiện ra ngay.
      //
      // Chỉ dựng lại danh sách khi nó THẬT SỰ đổi. Lúc mở, CKEditor đặt focus vào
      // mục đầu tiên; `items.clear()` gỡ đúng mục đó khỏi DOM, focus rơi ra
      // ngoài và `closeDropdownOnBlur` đóng dropdown ngay — người dùng chưa kịp
      // chọn gì. Khi buộc phải dựng lại thì trả focus về danh sách.
      dropdown.on('change:isOpen', (_evt, _name, isOpen) => {
        if (!isOpen) return;
        // Dữ liệu đã tải từ trước nhưng danh sách dựng khi còn rỗng: dựng lại
        // NGAY, đồng bộ — handler này chạy trước bước focus mục đầu của CKEditor
        // (priority low - 10) nên chưa có gì bị gỡ khỏi tay người dùng.
        if (filledFrom !== signature) fill();
        void loadCtas(true).then(() => {
          if (filledFrom === signature) return;
          fill();
          if (dropdown.isOpen) dropdown.listView?.focus();
        });
      });

      dropdown.on('execute', (evt) => {
        const slug = (evt.source as UIModel & { ctaSlug?: string }).ctaSlug;
        if (!slug) return;
        editor.model.change((writer) => {
          const el = writer.createElement(MODEL, { [ATTR]: slug });
          editor.model.insertObject(el, null, null, { setSelection: 'on' });
        });
        editor.editing.view.focus();
      });

      dropdown.bind('isEnabled').to(editor, 'isReadOnly', (ro) => !ro);
      return dropdown;
    });
  }
}
