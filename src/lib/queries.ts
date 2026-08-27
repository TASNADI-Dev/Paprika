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
      }
    }
  }
`);
