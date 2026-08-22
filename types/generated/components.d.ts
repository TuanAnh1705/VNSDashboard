import type { Schema, Struct } from '@strapi/strapi';

export interface ElementProcessCtaImg extends Struct.ComponentSchema {
  collectionName: 'components_element_process_cta_imgs';
  info: {
    displayName: 'cta-img';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ElementProcessProcess extends Struct.ComponentSchema {
  collectionName: 'components_element_process_processes';
  info: {
    displayName: 'process';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsAboutHeaderVideo extends Struct.ComponentSchema {
  collectionName: 'components_elements_about_header_videos';
  info: {
    displayName: 'headerVideo';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsAboutMainVideo extends Struct.ComponentSchema {
  collectionName: 'components_elements_about_main_videos';
  info: {
    displayName: 'mainVideo';
  };
  attributes: {
    description: Schema.Attribute.Text;
    mainTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ElementsAboutQuestions extends Struct.ComponentSchema {
  collectionName: 'components_elements_about_questions';
  info: {
    displayName: 'questions';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsAboutServices extends Struct.ComponentSchema {
  collectionName: 'components_elements_about_services';
  info: {
    displayName: 'services';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsProductsProducts extends Struct.ComponentSchema {
  collectionName: 'components_elements_products_products';
  info: {
    displayName: 'products';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsProductsTextHeader extends Struct.ComponentSchema {
  collectionName: 'components_elements_products_text_headers';
  info: {
    displayName: 'textHeader';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsProductsTextiles extends Struct.ComponentSchema {
  collectionName: 'components_elements_products_textiles';
  info: {
    displayName: 'Textiles';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface ElementsServicesFaq extends Struct.ComponentSchema {
  collectionName: 'components_elements_services_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface ElementsServicesProcess extends Struct.ComponentSchema {
  collectionName: 'components_elements_services_processes';
  info: {
    displayName: 'process';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsServicesServices extends Struct.ComponentSchema {
  collectionName: 'components_elements_services_services';
  info: {
    displayName: 'services';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsServicesWhyChooseUs extends Struct.ComponentSchema {
  collectionName: 'components_elements_services_why_chooseuses';
  info: {
    displayName: 'whyChooseUs';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_buttons';
  info: {
    displayName: 'button';
    icon: 'apps';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'neon-glow']
    >;
  };
}

export interface ElementsFormConfig extends Struct.ComponentSchema {
  collectionName: 'components_elements_form_configs';
  info: {
    displayName: 'form_config';
    icon: 'file';
  };
  attributes: {
    company_name: Schema.Attribute.String;
    email: Schema.Attribute.String;
    message: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface ElementsInfoColumn extends Struct.ComponentSchema {
  collectionName: 'components_elements_info_columns';
  info: {
    displayName: 'info_column';
    icon: 'bulletList';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    google_map_url: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsLinksocial extends Struct.ComponentSchema {
  collectionName: 'components_elements_linksocials';
  info: {
    displayName: 'Linksocial';
    icon: 'apps';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url: Schema.Attribute.String;
  };
}

export interface ElementsNumberWhy extends Struct.ComponentSchema {
  collectionName: 'components_elements_number_whies';
  info: {
    displayName: 'number-why';
    icon: 'eye';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsProductHome extends Struct.ComponentSchema {
  collectionName: 'components_elements_product_homes';
  info: {
    displayName: 'productHome';
    icon: 'apps';
  };
  attributes: {
    ProductImg: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    ProductName: Schema.Attribute.String;
  };
}

export interface ElementsSlideClient extends Struct.ComponentSchema {
  collectionName: 'components_elements_slide_clients';
  info: {
    displayName: 'slide-client';
    icon: 'arrowRight';
  };
  attributes: {
    clientImg: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    description: Schema.Attribute.Text;
    testimonial: Schema.Attribute.String;
  };
}

export interface ElementsSlideItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_slide_items';
  info: {
    displayName: 'Slide-Item';
    icon: 'cast';
  };
  attributes: {
    description: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    mainTitle: Schema.Attribute.Text;
    subTitle: Schema.Attribute.String;
  };
}

export interface ElementsSlideTeam extends Struct.ComponentSchema {
  collectionName: 'components_elements_slide_teams';
  info: {
    displayName: 'slide-team';
    icon: 'arrowRight';
  };
  attributes: {
    description: Schema.Attribute.String;
    name: Schema.Attribute.String;
    slides: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ElementsTextContact extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_contacts';
  info: {
    displayName: 'text-contact';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface ElementsTextHeaderBlog extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_header_blogs';
  info: {
    displayName: 'textHeaderBlog';
  };
  attributes: {
    description: Schema.Attribute.Text;
    imag: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ElementsWhyElement extends Struct.ComponentSchema {
  collectionName: 'components_elements_why_elements';
  info: {
    displayName: 'why-element';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionPrivacyContent extends Struct.ComponentSchema {
  collectionName: 'components_section_privacy_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SectionSeoDefaultSeo extends Struct.ComponentSchema {
  collectionName: 'components_section_seo_default_seos';
  info: {
    displayName: 'Default-seo';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 180;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
  };
}

export interface SectionsAboutBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_banners';
  info: {
    displayName: 'banner';
  };
  attributes: {
    banner: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    header: Schema.Attribute.String;
  };
}

export interface SectionsAboutExpertise extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_expertise';
  info: {
    displayName: 'expertise';
  };
  attributes: {
    header: Schema.Attribute.Component<'elements-about.header-video', false>;
    main: Schema.Attribute.Component<'elements-about.main-video', false>;
  };
}

export interface SectionsAboutFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    faq: Schema.Attribute.Component<'elements-about.questions', true>;
    mainTitle: Schema.Attribute.String;
  };
}

export interface SectionsAboutNeedHelp extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_need_helps';
  info: {
    displayName: 'needHelp';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button', false>;
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsAboutServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_services';
  info: {
    displayName: 'services';
  };
  attributes: {
    main: Schema.Attribute.Component<'elements-about.services', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsBlogBlogDetail extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_blog_details';
  info: {
    displayName: 'BlogDetail';
  };
  attributes: {
    BlogContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SectionsBlogTagSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_tag_sections';
  info: {
    displayName: 'TagSection';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SectionsProcessOrderProcess extends Struct.ComponentSchema {
  collectionName: 'components_sections_process_order_processes';
  info: {
    displayName: 'OrderProcess';
  };
  attributes: {
    cta: Schema.Attribute.Component<'element-process.cta-img', false>;
    ctaButton: Schema.Attribute.Component<'elements.button', false>;
    mainTitle: Schema.Attribute.String;
    process: Schema.Attribute.Component<'element-process.process', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProductsProducts extends Struct.ComponentSchema {
  collectionName: 'components_sections_products_products';
  info: {
    displayName: 'products';
  };
  attributes: {
    products: Schema.Attribute.Component<'elements-products.products', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProductsTextBottom extends Struct.ComponentSchema {
  collectionName: 'components_sections_products_text_bottoms';
  info: {
    displayName: 'textBottom';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.button', false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProductsTextiles extends Struct.ComponentSchema {
  collectionName: 'components_sections_products_textiles';
  info: {
    displayName: 'Textiles';
  };
  attributes: {
    Textiles: Schema.Attribute.Component<'elements-products.textiles', true>;
  };
}

export interface SectionsServicesFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    faq: Schema.Attribute.Component<'elements-services.faq', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsServicesOurProcess extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_our_processes';
  info: {
    displayName: 'ourProcess';
  };
  attributes: {
    bg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    boat: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    process: Schema.Attribute.Component<'elements-services.process', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsServicesServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_services';
  info: {
    displayName: 'services';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.button', false>;
    description: Schema.Attribute.String;
    services: Schema.Attribute.Component<'elements-services.services', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsServicesWhyChooseUs extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_why_chooseuses';
  info: {
    displayName: 'whyChooseUs';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    reason: Schema.Attribute.Component<'elements-services.why-choose-us', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_banners';
  info: {
    displayName: 'banner';
    icon: 'calendar';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button', true>;
    description: Schema.Attribute.String;
    firstText: Schema.Attribute.String;
    itemImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    lastText: Schema.Attribute.String;
    middleText: Schema.Attribute.String;
    rootImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsContactSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_sections';
  info: {
    displayName: 'ContactSection';
    icon: 'headphone';
  };
  attributes: {
    formConfig: Schema.Attribute.Component<'elements.form-config', true>;
    info: Schema.Attribute.Component<'elements.info-column', true>;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCtaImg extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_imgs';
  info: {
    displayName: 'cta-img';
    icon: 'picture';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button', true>;
    ctaImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_footers';
  info: {
    displayName: 'footer';
    icon: 'arrowDown';
  };
  attributes: {
    description: Schema.Attribute.Text;
    headerLink: Schema.Attribute.Component<'elements.link', true>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    pageLinks: Schema.Attribute.Component<'elements.link', true>;
    socialLinks: Schema.Attribute.Component<'elements.linksocial', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
    icon: 'cast';
  };
  attributes: {
    description: Schema.Attribute.Text;
    intro: Schema.Attribute.Media<'files' | 'videos'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProduct extends Struct.ComponentSchema {
  collectionName: 'components_sections_products';
  info: {
    displayName: 'product';
    icon: 'picture';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button', true>;
    productItem: Schema.Attribute.Component<'elements.product-home', true>;
  };
}

export interface SectionsSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_sliders';
  info: {
    displayName: 'slider';
    icon: 'arrowRight';
  };
  attributes: {
    mainDes: Schema.Attribute.String;
    slides: Schema.Attribute.Component<'elements.slide-item', true>;
    subDes: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSliderClient extends Struct.ComponentSchema {
  collectionName: 'components_sections_slider_clients';
  info: {
    displayName: 'slider-client';
    icon: 'arrowRight';
  };
  attributes: {
    description: Schema.Attribute.String;
    slides: Schema.Attribute.Component<'elements.slide-client', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSliderTeam extends Struct.ComponentSchema {
  collectionName: 'components_sections_slider_teams';
  info: {
    displayName: 'slider-team';
    icon: 'arrowRight';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button', true>;
    description: Schema.Attribute.String;
    slides: Schema.Attribute.Component<'elements.slide-team', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTextBottom extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_bottoms';
  info: {
    displayName: 'text-bottom';
    icon: 'bold';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsWhySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_sections';
  info: {
    displayName: 'why-section';
    icon: 'apps';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    numberReason: Schema.Attribute.Component<'elements.number-why', true>;
    reason: Schema.Attribute.Component<'elements.why-element', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'element-process.cta-img': ElementProcessCtaImg;
      'element-process.process': ElementProcessProcess;
      'elements-about.header-video': ElementsAboutHeaderVideo;
      'elements-about.main-video': ElementsAboutMainVideo;
      'elements-about.questions': ElementsAboutQuestions;
      'elements-about.services': ElementsAboutServices;
      'elements-products.products': ElementsProductsProducts;
      'elements-products.text-header': ElementsProductsTextHeader;
      'elements-products.textiles': ElementsProductsTextiles;
      'elements-services.faq': ElementsServicesFaq;
      'elements-services.process': ElementsServicesProcess;
      'elements-services.services': ElementsServicesServices;
      'elements-services.why-choose-us': ElementsServicesWhyChooseUs;
      'elements.button': ElementsButton;
      'elements.form-config': ElementsFormConfig;
      'elements.info-column': ElementsInfoColumn;
      'elements.link': ElementsLink;
      'elements.linksocial': ElementsLinksocial;
      'elements.number-why': ElementsNumberWhy;
      'elements.product-home': ElementsProductHome;
      'elements.slide-client': ElementsSlideClient;
      'elements.slide-item': ElementsSlideItem;
      'elements.slide-team': ElementsSlideTeam;
      'elements.text-contact': ElementsTextContact;
      'elements.text-header-blog': ElementsTextHeaderBlog;
      'elements.why-element': ElementsWhyElement;
      'section-privacy.content': SectionPrivacyContent;
      'section-seo.default-seo': SectionSeoDefaultSeo;
      'sections-about.banner': SectionsAboutBanner;
      'sections-about.expertise': SectionsAboutExpertise;
      'sections-about.faq': SectionsAboutFaq;
      'sections-about.need-help': SectionsAboutNeedHelp;
      'sections-about.services': SectionsAboutServices;
      'sections-blog.blog-detail': SectionsBlogBlogDetail;
      'sections-blog.tag-section': SectionsBlogTagSection;
      'sections-process.order-process': SectionsProcessOrderProcess;
      'sections-products.products': SectionsProductsProducts;
      'sections-products.text-bottom': SectionsProductsTextBottom;
      'sections-products.textiles': SectionsProductsTextiles;
      'sections-services.faq': SectionsServicesFaq;
      'sections-services.our-process': SectionsServicesOurProcess;
      'sections-services.services': SectionsServicesServices;
      'sections-services.why-choose-us': SectionsServicesWhyChooseUs;
      'sections.banner': SectionsBanner;
      'sections.contact-section': SectionsContactSection;
      'sections.cta-img': SectionsCtaImg;
      'sections.footer': SectionsFooter;
      'sections.hero': SectionsHero;
      'sections.product': SectionsProduct;
      'sections.slider': SectionsSlider;
      'sections.slider-client': SectionsSliderClient;
      'sections.slider-team': SectionsSliderTeam;
      'sections.text-bottom': SectionsTextBottom;
      'sections.why-section': SectionsWhySection;
    }
  }
}
