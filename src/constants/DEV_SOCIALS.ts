export interface Social {
  url: string;
  label: string;
  logoUrl?: string;
}

export const DEVELOPER_SOCIALS = {
  gitlab: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gitlab.svg',
    url: 'https://gitlab.com/users/adaland-com/projects',
    label: '@adaland-com',
  },
  github: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg',
    url: 'https://github.com/adaland-com?tab=repositories',
    label: '@adaland-com',
  },
} as const;


export const SOCIALS = {
  email: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/protonmail.svg',
    url: 'adrianna.boczar@protonmail.com',
    label: 'adrianna.boczar@protonmail.com',
  },
  linkedin: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg',
    url: 'https://www.linkedin.com/in/adrianna-boczar/',
    label: '@adrianna-boczar',
  },
} as const;

