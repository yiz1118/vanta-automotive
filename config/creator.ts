export type CreatorConfiguration = {
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
  linkedinUrl: string;
  githubUrl: string;
  whatsappDisplay: string;
  whatsappUrl: string;
  portfolioUrl: string | null;
};

export const creator: CreatorConfiguration = {
  name: "Alson Chua",
  title: "Independent Web & App Developer",
  email: "alsonchua18@gmail.com",
  location: "Malaysia · Working with clients worldwide",
  availability: "Available for freelance projects worldwide",
  linkedinUrl: "https://www.linkedin.com/in/chua-yiz-063ba9272",
  githubUrl: "https://github.com/yiz1118",
  whatsappDisplay: "+60 11-5857 6386",
  whatsappUrl: "https://wa.me/601158576386",
  portfolioUrl: null,
};

export const creatorProject = {
  name: "VANTA Motorworks",
  type: "Independent Concept Project",
  year: 2026,
};

export function getCreatorContactLinks(configuration: CreatorConfiguration = creator) {
  const firstName = configuration.name.trim().split(/\s+/)[0];
  const message = `Hi ${firstName}, I came across your ${creatorProject.name} concept project and I'm interested in discussing a website/app project with you.`;
  const whatsapp = new URL(configuration.whatsappUrl);
  whatsapp.searchParams.set("text", message);
  const subject = `Project Inquiry — ${creatorProject.name}`;
  const body = `Hi ${firstName},\n\nI came across your ${creatorProject.name} concept project and would like to discuss a potential website/app project.\n\n`;

  return {
    email: `mailto:${configuration.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    whatsapp: whatsapp.toString(),
  };
}
