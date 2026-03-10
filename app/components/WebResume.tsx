export default function WebResume() {
  const work = [
    {
      company: "Oneture Technologies",
      title: "Software Engineering Intern",
      date: "Jan '24 - Jun '24",
    },
    {
      company: "University of Auckland - Signal Corp.",
      title: "Micro-internship",
      date: "Jul '23 - Aug '23",
    },
    {
      company: "Oneture Technologies",
      title: "Software Engineering Intern",
      date: "Oct '21 - Dec '21",
    },
  ];

  const edu = [
    {
      university: "Northeastern University",
      degree: "Master of Science in Computer Science",
      date: "Sep '24 - Present",
    },
    {
      university: "NMIMS University",
      degree:
        "Bachelor of Technology in Computer Science and Engineering (Cybersecurity)",
      date: "Aug '20 - Aug '24",
    }
  ];

  return (
    <div className="px-[20px] flex flex-col gap-6 max-w-2xl mx-auto text-slate-300">
      <div>
        <h2 className="text-slate-200 font-light text-lg my-[10px] border-b border-slate-700/50">
          Education
        </h2>
        <ul className="flex flex-col gap-2">
          {edu.map(({ university, degree, date }) => (
            <li
              className="flex justify-between gap-2"
              key={`${university}${degree}${date}`}
            >
              <div>
                <h3>{university}</h3>
                <p className="text-sm max-w-80">{degree}</p>
              </div>
              <p className="text-sm text-slate-500">{date}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-slate-200 font-light text-lg my-[10px] border-b border-slate-700/80">
          Work
        </h2>
        <ul className="flex flex-col gap-2">
          {work.map(({ company, title, date }) => (
            <li
              className="flex justify-between gap-2"
              key={`${company}${title}${date}`}
            >
              <div>
                <h3>{title}</h3>
                <p className="text-sm">{company}</p>
              </div>
              <p className="text-sm text-slate-500">{date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
