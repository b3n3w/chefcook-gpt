export const slugify = (str: string): string =>
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s,-]/g, '')
		.replace(/[\s,-]+/g, '-')
		.replace(/^-+|-+$/g, '');

export const deslugify = (slug: string): string =>
	slug
		.replace(/-/g, ' ')
		.replace(/^\d+/g, '') // remove leading digits
		.replace(/[^-\w\s,]/g, '') // remove non-word characters except hyphens, spaces, and commas
		.trim()
		.replace(/[-\s]+/g, ' ') // replace hyphens and multiple spaces with a single space
		.replace(/\s*,\s*/g, ', ') // replace commas with a comma followed by a space
		.replace(/\s+/g, ' ') // replace multiple spaces with a single space
		.replace(/\b\w/g, (m) => m.toUpperCase());
