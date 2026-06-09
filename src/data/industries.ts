export type Project = {
  id: number | string
  title: string
  category: string
  year: string
  youtubeId: string
  vertical?: boolean
  description: string
}

export type IndustryConfig = {
  slug: string
  industryLabel: string
  subheadline: string
  workTitle: string
}

export const industries: Record<string, IndustryConfig> = {
  restaurant: {
    slug: 'restaurant',
    industryLabel: 'FOR RESTAURANTS',
    subheadline: 'We make restaurants unforgettable.',
    workTitle: 'OUR RESTAURANT\nWORK',
  },
  clinic: {
    slug: 'clinic',
    industryLabel: 'FOR CLINICS',
    subheadline: 'We tell the story behind the care.',
    workTitle: 'OUR CLINIC\nWORK',
  },
  islamic: {
    slug: 'islamic',
    industryLabel: 'FOR ISLAMIC ORGS',
    subheadline: 'We capture community and faith.',
    workTitle: 'OUR ISLAMIC\nWORK',
  },
}

export const INDUSTRY_KEYS = Object.keys(industries) as string[]
