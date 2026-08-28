/** Hidden locale tag for localized singleton documents. */
import { defineField } from 'sanity';

export const languageField = defineField({
  name: 'language',
  type: 'string',
  readOnly: true,
  hidden: true,
  initialValue: 'en',
});

export function getLocaleSubtitle(
  language: string | undefined,
  documentId: string | undefined,
): string {
  const normalizedId = documentId?.replace(/^drafts\./, '') ?? '';

  if (language) {
    return language.toUpperCase();
  }

  return normalizedId.endsWith('-fr') ? 'FR' : 'EN';
}
