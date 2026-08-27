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

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "about"][0]{
    sections[]{
      _key,
      _type,
      _type == "aboutHeroSection" => {
        headline,
        body,
        image{
          ...,
          alt
        }
      },
      _type == "aboutIntroSection" => {
        body,
        highlights[]{
          _key,
          icon,
          title,
          body
        },
        ctaLabel
      },
      _type == "aboutValuesSection" => {
        headline,
        body,
        values[]{
          _key,
          icon,
          title,
          body
        }
      }
    }
  }
`);

export const PRODUCTS_PAGE_QUERY = defineQuery(`
  *[_type == "productsPage" && _id == "products"][0]{
    floorStand{
      body,
      images[]{
        ...,
        alt
      }
    },
    counter{
      body,
      images[]{
        ...,
        alt
      }
    },
    shelfOrganizer{
      body,
      images[]{
        ...,
        alt
      }
    },
    busStopFrame{
      body,
      images[]{
        ...,
        alt
      }
    },
    crossMerch{
      body,
      images[]{
        ...,
        alt
      }
    },
    testerGlorifier{
      body,
      images[]{
        ...,
        alt
      }
    },
    eco{
      body,
      images[]{
        ...,
        alt
      }
    }
  }
`);

export const PRIVACY_PAGE_QUERY = defineQuery(`
  *[_type == "privacyPage" && _id == "privacy"][0]{
    title,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href
        }
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
