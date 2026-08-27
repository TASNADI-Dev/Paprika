/** GROQ queries for Sanity page content. */
import { defineQuery } from 'groq';

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "home"][0]{
    sections[]{
      _key,
      _type,
      _type == "heroSection" => {
        headline,
        body,
        ctaLabel,
        image{
          ...,
          alt
        }
      },
      _type == "servicesSection" => {
        headline,
        body,
        services[]{
          _key,
          icon,
          title,
          body
        }
      },
      _type == "ecoSection" => {
        headline,
        body,
        image{
          ...,
          alt
        }
      },
      _type == "quoteSection" => {
        headline,
        body,
        contactInfo{
          title,
          companyName,
          items[]{
            _key,
            icon,
            text,
            href
          }
        }
      },
      _type == "supportSection" => {
        note
      }
    }
  }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer" && _id == "footer"][0]{
    slogan,
    contactItems[]{
      _key,
      icon,
      text,
      href
    }
  }
`);
