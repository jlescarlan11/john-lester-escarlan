import { ResumeData } from "@/app/_components/_data/resumeData";

function escapeLatex(str: string): string {
  // Escape # and other problematic LaTeX characters
  return str.replace(/([#%&$~_^{}\\])/g, '\\$1');
}

// Helper: List of tech stack exceptions
const techStackExceptions = [
  "Node.js", "Next.js", "Express.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Redux/Context API", "Spring Boot", "PHP", "Laravel", "RESTful APIs", "JWT", "PostgreSQL", "MySQL", "MongoDB", "Firebase", "Git", "GitHub", "VS Code", "Docker", "Postman", "npm/yarn", "Jest", "React Testing Library", "Astro", "GraphQL", "AWS", ".NET", "Slack", "C#", "Bootstrap", "Supabase"
];

function splitAndCapitalize(description: string): string[] {
  // Replace periods in tech stack names with a placeholder
  let replaced = description;
  techStackExceptions.forEach(term => {
    replaced = replaced.replace(new RegExp(term.replace(/\./g, '\\.'), 'g'), term.replace(/\./g, '<<DOT>>'));
  });
  // Split on periods
  let sentences = replaced.split('.').map(s => s.trim()).filter(Boolean);
  // Restore periods in tech stack names
  sentences = sentences.map(s => techStackExceptions.reduce((acc, term) => acc.replace(new RegExp(term.replace(/\./g, '<<DOT>>'), 'g'), term), s));
  // Capitalize
  return sentences.map(s => s.charAt(0).toUpperCase() + s.slice(1));
}

function sanitizeLatexWhitespace(str: string): string {
  // Replace all whitespace except space and newline with a regular space
  return str.replace(/[\u000B\u00A0\u2000-\u200B\u202F\u205F\u3000\t\r\f]/g, ' ');
}

export function generateLatex(data: ResumeData) {
  const latex = `
% LaTeX preamble

\\documentclass[10pt, letterpaper]{article}
% ... (add your full preamble here, see user example) ...

% Packages:
\\usepackage[
    ignoreheadfoot,
    top=2 cm,
    bottom=2 cm,
    left=2 cm,
    right=2 cm,
    footskip=1.0 cm,
]{geometry}
\\usepackage{titlesec}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage[dvipsnames]{xcolor}
\\definecolor{primaryColor}{RGB}{0, 0, 0}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{amsmath}
\\usepackage[
    pdftitle={${escapeLatex(data.name)}'s CV},
    pdfauthor={${escapeLatex(data.name)}},
    pdfcreator={LaTeX with RenderCV},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref}
\\usepackage[pscoord]{eso-pic}
\\usepackage{calc}
\\usepackage{bookmark}
\\usepackage{lastpage}
\\usepackage{changepage}
\\usepackage{paracol}
\\usepackage{ifthen}
\\usepackage{needspace}
\\usepackage{iftex}
\\ifPDFTeX
    \\input{glyphtounicode}
    \\pdfgentounicode=1
    \\usepackage[T1]{fontenc}
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
\\fi
\\usepackage{charter}
\\raggedright
\\AtBeginEnvironment{adjustwidth}{\\partopsep0pt}
\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setlength{\\parindent}{0pt}
\\setlength{\\topskip}{0pt}
\\setlength{\\columnsep}{0.15cm}
\\pagenumbering{gobble}
\\titleformat{\\section}{\\needspace{4\\baselineskip}\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule]
\\titlespacing{\\section}{-1pt}{0.3 cm}{0.2 cm}
\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\small$\\bullet$}}$}
\\newenvironment{highlights}{\\begin{itemize}[topsep=0.10 cm,parsep=0.10 cm,partopsep=0pt,itemsep=0pt,leftmargin=0 cm + 10pt]}{\\end{itemize}}
\\newenvironment{highlightsforbulletentries}{\\begin{itemize}[topsep=0.10 cm,parsep=0.10 cm,partopsep=0pt,itemsep=0pt,leftmargin=10pt]}{\\end{itemize}}
\\newenvironment{onecolentry}{\\begin{adjustwidth}{0 cm + 0.00001 cm}{0 cm + 0.00001 cm}}{\\end{adjustwidth}}
\\newenvironment{twocolentry}[2][]{\\onecolentry\\def\\secondColumn{#2}\\setcolumnwidth{\\fill, 8 cm}\\begin{paracol}{2}}{\\switchcolumn \\raggedleft \\secondColumn\\end{paracol}\\endonecolentry}
\\newenvironment{threecolentry}[3][]{\\onecolentry\\def\\thirdColumn{#3}\\setcolumnwidth{, \\fill, 4.5 cm}\\begin{paracol}{3}{{\\raggedright #2}} \\switchcolumn}{\\switchcolumn \\raggedleft \\thirdColumn\\end{paracol}\\endonecolentry}
\\newenvironment{header}{\\setlength{\\topsep}{0pt}\\par\\kern\\topsep\\centering\\linespread{1.5}}{\\par\\kern\\topsep}
\\let\\hrefWithoutArrow\\href
\\begin{document}

% Header
\\begin{header}
  \\fontsize{25 pt}{25 pt}\\selectfont ${escapeLatex(data.name)}
  \\vspace{5 pt}
  \\normalsize
  % First line: location | email | phone | website (website is a clickable link with full URL as text)
  \\centerline{${escapeLatex(data.location)} \\textbar{} ${escapeLatex(data.email)} \\textbar{} ${escapeLatex(data.phone)} \\textbar{} \\href{${escapeLatex(data.website)}}{${escapeLatex(data.website)}}}
  % Second line: linkedin | github (both clickable links with full URL as text)
  \\centerline{${escapeLatex(data.linkedin)} \\textbar{} ${escapeLatex(data.github)}}
\\end{header}

% About
\\section{About Me}
\\begin{onecolentry}
  \\begin{highlightsforbulletentries}
    ${data.about.flatMap(item => splitAndCapitalize(item)).map(sentence => `\\item ${escapeLatex(sentence)}`).join("\n    ")}
  \\end{highlightsforbulletentries}
\\end{onecolentry}

% Education
\\section{Education}
${data.education.map(edu => `\\begin{twocolentry}{${escapeLatex(edu.duration)}}\\textbf{${escapeLatex(edu.institution)}}, ${escapeLatex(edu.degree)}\\end{twocolentry}\n\\vspace{0.10 cm}\n\\begin{onecolentry}\n  \\begin{highlights}\n    ${edu.description.map(d => `\\item ${escapeLatex(d)}`).join("\n    ")}\n  \\end{highlights}\n\\end{onecolentry}`).join("\n\n")}

% Experience
\\section{Experience}
${data.experience.map(exp => `\\begin{twocolentry}{${escapeLatex(exp.duration)}}\\textbf{${escapeLatex(exp.position)}}, ${escapeLatex(exp.company)}\\end{twocolentry}\n\\vspace{0.10 cm}\n\\begin{onecolentry}\n  \\begin{highlights}\n    ${exp.description.map(d => `\\item ${escapeLatex(d)}`).join("\n    ")}\n    \\item \\textbf{Technologies:} ${exp.technologies.map(escapeLatex).join(", ")}\n  \\end{highlights}\n\\end{onecolentry}`).join("\n\n")}

% Projects
\\section{Projects}
${data.projects.map(proj => `\\begin{twocolentry}{${new Date(proj.createdAt).getFullYear()}}\\textbf{${escapeLatex(proj.title)}}\\end{twocolentry}\n\\vspace{0.10 cm}\n\\begin{onecolentry}\n  \\begin{highlights}\n    ${splitAndCapitalize(proj.description).map(line => `\\item ${escapeLatex(line)}`).join("\n    ")}\n    \\item \\textbf{Technologies:} ${proj.technology.map(escapeLatex).join(", ")}\n    ${proj.link ? `\\item Live Demo: \\href{${escapeLatex(proj.link)}}{${escapeLatex(proj.link)}}` : ""}\n  \\end{highlights}\n\\end{onecolentry}`).join("\n\n")}

% Technologies
\\section{Technologies}
${data.technologies.map(cat => `\\begin{onecolentry}\\textbf{${escapeLatex(cat.title)}:} ${cat.items.map(escapeLatex).join(", ")}\\end{onecolentry}`).join("\n\\vspace{0.2 cm}\n")}

% Certifications
\\section{Certifications \\& Awards}
${data.certifications.map(cert => `\\begin{twocolentry}{${escapeLatex(cert.year)}}\\textbf{${escapeLatex(cert.title)}}\\end{twocolentry}`).join("\n")}

\\end{document}
  `;
  return sanitizeLatexWhitespace(latex);
} 