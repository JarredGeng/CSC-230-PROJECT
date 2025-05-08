import React from "react";
import "../styles/Resources.css";

const faculty = [
  {
    name: "Brandon C. Dulisse",
    title: "Director, Criminology Institute for Research and Training; Associate Professor, Criminology and Criminal Justice",
    phone: "(813) 257-4018",
    office: "Plant Hall Room: PH-317",
    mailbox: "Box Q",
    email: "bdulisse@ut.edu",
    image: "dulisse-brandon-c.jpg",
    specialties: "Corrections, Cybercrime, Financial Crime, Criminal Justice Policy"
  },
  {
    name: "Carly M. Hilinski-Rosick",
    title: "Chair, Criminology and Criminal Justice; Professor, Criminology and Criminal Justice",
    phone: "(813) 257-3563",
    office: "Plant Hall Room: PH-411",
    mailbox: "Box Q",
    email: "chilinskirosick@ut.edu",
    image: "hilinski-rosick-carly-m.jpg",
    specialties: "Victimization, Corrections"
  },
  {
    name: "Chivon Fitch",
    title: "Coordinator, Criminology and Criminal Justice MS Program; Associate Professor, Criminology and Criminal Justice",
    phone: "(813) 257-3194",
    office: "Plant Hall Room: PH-419",
    mailbox: "Box Q",
    email: "cfitch@ut.edu",
    image: "fitch-chivon.jpg",
    specialties: "Policing/Law Enforcement, Criminal Justice Policy, Victimization, Corrections, Social Justice/Criminal Justice Reform",
    training: "Statistics and Data Analysis"
  },
  {
    name: "Nate Connealy",
    title: "Associate Director of Consultation and Training",
    email: "nconnealy@ut.edu",
    specialties: "Policing/Law Enforcement, Criminal Justice Policy, Quantitative Data",
    training: "GIS, Statistics, Crime Mapping"
  },
  {
    name: "Tim Hart",
    title: "Associate Director of Research and Engagement",
    email: "thart@ut.edu",
    specialties: "Victimization, Crime Analysis/Mapping",
    training: "GIS, Statistics and Data Analysis"
  },
  {
    name: "Amanda Osuna",
    title: "Research Associate",
    email: "aosuna@ut.edu",
    specialties: "Victimization, Vulnerability and Intersectionality",
    training: "Qualitative Research Methods"
  },
  {
    name: "Leo Genco",
    title: "Research Associate",
    email: "lgenco@ut.edu",
    specialties: "Violent Crime, Wildlife and Environmental Crime, Animal Cruelty",
    training: "Statistics and Data Analysis"
  },
  {
    name: "Cedric Michel",
    title: "Research Associate",
    email: "cmichel@ut.edu",
    specialties: "Criminal Justice Policy, Victimization, Courts/Sentencing, Criminal Justice Reform, White-Collar Crime, Death Penalty"
  },
  {
    name: "Kathryn Branch",
    title: "Research Associate",
    email: "kbranch@ut.edu",
    specialties: "Victimization"
  },
  {
    name: "Kayla Toohy",
    title: "Research Associate",
    email: "ktoohy@ut.edu",
    specialties: "Victimization, Violent Crime",
    training: "GIS, Quantitative Data Analysis"
  },
  {
    name: "Rhissa Briones Robinson",
    title: "Research Associate",
    email: "rrobinson@ut.edu",
    specialties: "Victimization, Violent Crime, Juvenile Delinquency, Theoretical Approaches",
    training: "Statistics, Data Analysis"
  },
  {
    name: "Gabriel Paez",
    title: "Research Associate",
    email: "gpaez@ut.edu",
    specialties: "Policing/Law Enforcement, Victimization",
    training: "Statistics, Data Analysis"
  },
  {
    name: "Cassidy Tevlin",
    title: "Research Associate",
    email: "ctevlin@ut.edu",
    specialties: "Criminal Justice Policy, Juvenile Justice, Developmental Criminology, Biosocial Criminology"
  }
];

const Resources = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "100px 40px",
        color: "#000",
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "60px", fontSize: "2.8rem" }}>
        Resources
      </h1>

      <div style={{ margin: "40px 0", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
          Featured Talk: The Reality of Crime & Justice
        </h2>
        <iframe
          width="720"
          height="405"
          src="https://www.youtube.com/embed/TlS4_qVbQHU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Faculty Section */}
      <div style={{ marginTop: "80px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px", textAlign: "center" }}>
          Meet the Faculty
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
          {faculty.map((member, index) => (
            <div
              key={index}
              style={{
                width: "280px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
              )}
              <h4 style={{ margin: "10px 0 5px", fontSize: "1.2rem" }}>{member.name}</h4>
              <p style={{ fontSize: "0.95rem", color: "#444", marginBottom: "8px" }}>{member.title}</p>
              {member.phone && (
                <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "4px" }}>
                  <strong>Phone:</strong> {member.phone}
                </p>
              )}
              {member.office && (
                <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "4px" }}>
                  <strong>Office:</strong> {member.office}
                </p>
              )}
              {member.mailbox && (
                <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "4px" }}>
                  <strong>Mailbox:</strong> {member.mailbox}
                </p>
              )}
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "4px" }}>
                <strong>Specialties:</strong> {member.specialties}
              </p>
              {member.training && (
                <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "10px" }}>
                  <strong>Training:</strong> {member.training}
                </p>
              )}
              <a href={`mailto:${member.email}`} style={{ color: "#1a73e8", fontSize: "0.9rem" }}>
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;