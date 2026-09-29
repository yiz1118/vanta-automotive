import { ArrowUpRightIcon } from "@/components/icons";
import { creator, creatorProject, getCreatorContactLinks, type CreatorConfiguration } from "@/config/creator";

export function CreatorLayer({ configuration = creator }: { configuration?: CreatorConfiguration } = {}) {
  const contacts = getCreatorContactLinks(configuration);
  const methods = [
    { event: "email", label: "Email", detail: configuration.email, href: contacts.email, external: false },
    { event: "whatsapp", label: "WhatsApp", detail: configuration.whatsappDisplay, href: contacts.whatsapp, external: true },
    { event: "linkedin", label: "LinkedIn", detail: null, href: configuration.linkedinUrl, external: true },
    { event: "github", label: "GitHub", detail: null, href: configuration.githubUrl, external: true },
  ];

  return <section className="creator-layer" aria-labelledby="creator-name" data-creator-project={creatorProject.name}>
    <div className="creator-meta mono"><span>{creatorProject.type}</span><span>Design & development / {creatorProject.year}</span></div>
    <div className="creator-grid">
      <div className="creator-credit">
        <p className="creator-kicker">Designed & developed by</p>
        <h2 id="creator-name">{configuration.name}</h2>
        <p className="creator-title">{configuration.title}</p>
        <p className="creator-location">{configuration.location}</p>
        <p className="creator-availability">{configuration.availability}</p>
      </div>
      <div className="creator-project">
        <p className="creator-kicker">Have a similar project in mind?</p>
        <h3>Let&apos;s build<br />something together.</h3>
        <div className="creator-actions">
          <details className="creator-chooser">
            <summary className="button-primary" data-creator-event="start_project"><span>Start a Project</span><ArrowUpRightIcon /></summary>
            <div className="creator-choices" role="group" aria-label="Choose a contact method">
              <a href={contacts.email} data-creator-event="email" aria-label={`Email ${configuration.name} about a project`}>Email<ArrowUpRightIcon /></a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" data-creator-event="whatsapp" aria-label={`WhatsApp ${configuration.name} about a project`}>WhatsApp<ArrowUpRightIcon /></a>
            </div>
          </details>
          {configuration.portfolioUrl && <a className="button-secondary creator-portfolio" href={configuration.portfolioUrl} target="_blank" rel="noopener noreferrer" data-creator-event="portfolio">View Portfolio<ArrowUpRightIcon /></a>}
        </div>
      </div>
    </div>
    <nav className="creator-contacts" aria-label="Creator contact">{methods.map((method) => <a className="creator-contact-link" key={method.event} href={method.href} target={method.external ? "_blank" : undefined} rel={method.external ? "noopener noreferrer" : undefined} data-creator-event={method.event} aria-label={`${method.label}: contact ${configuration.name}${method.event === "github" ? " or explore his code" : ""}`}><span><strong>{method.label}</strong>{method.detail && <small>{method.detail}</small>}</span><ArrowUpRightIcon /></a>)}</nav>
  </section>;
}
