// components/ResumePDF.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from '@react-pdf/renderer';
import { myProfile } from '@/app/data/profile';

/* ------------------ FONT ------------------ */
Font.register({
  family: 'Helvetica',
  fonts: [{ src: 'https://fonts.gstatic.com/s/helvetica/v11/Helvetica.ttf' }],
});

/* Disable auto-hyphenation globally */
Font.registerHyphenationCallback(word => [word]);

/* ------------------ STYLES ------------------ */
const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.45,
    color: '#1f2937',
  },

  /* ---------- HEADER ---------- */
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },

  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    letterSpacing: 1,
  },

  designation: {
    marginTop: 20,               // 👈 controlled overlap
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
  },

  contactRow: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 10,
    color: '#4b5563',
    gap: 8,
  },

  divider: {
    width: 100,
    height: 1.5,
    backgroundColor: '#2563eb',
    marginTop: 5,
  },

  /* ---------- SECTIONS ---------- */
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    marginTop: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#bfdbfe',
    paddingBottom: 4,
  },

  role: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },

  meta: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 4,
  },

  bulletRow: {
    flexDirection: 'row',
    marginTop: 3,
  },

  bullet: {
    width: 10,
  },

  bulletText: {
    flex: 1,
    fontSize: 11,
  },

  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  column: {
    width: '48%',
  },

  link: {
    color: '#2563eb',
    textDecoration: 'underline',
    fontSize: 10,
  },
});

/* ------------------ COMPONENT ------------------ */
export function ResumePDF() {
  const p = myProfile;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>

        {/* ================= HEADER ================= */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.designation}>{p.designation}</Text>
          {/* <View style={styles.divider} /> */}

          <View style={styles.contactRow}>
            <Text>{p.contact.phone}</Text>
            <Text>|</Text>
            <Text>{p.contact.email}</Text>
            <Text>|</Text>
            <Link src={p.contact.linkedin} style={styles.link}>LinkedIn</Link>
            <Text>|</Text>
            <Link src={p.contact.github} style={styles.link}>GitHub</Link>
          </View>
        </View>

        {/* ================= SUMMARY ================= */}
        <Text style={styles.sectionTitle}>CAREER OBJECTIVE</Text>
        <Text>{p.introduction}</Text>

        {/* ================= SKILLS ================= */}
        <View style={styles.twoColumn} wrap={false}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Languages:</Text> {p.skills.languages.join(', ')}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Frameworks:</Text> {p.skills.frameworks.join(', ')}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Tools:</Text> {p.skills.tools.join(', ')}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Concepts:</Text> {p.skills.concepts.join(', ')}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            {p.languages.map(lang => (
              <Text key={lang}>• {lang}</Text>
            ))}
          </View>
        </View>

        {/* ================= EXPERIENCE ================= */}
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {p.experience.map((exp, i) => (
          <View key={i} wrap={false} style={{ marginBottom: 12 }}>
            <Text style={styles.role}>{exp.role} — {exp.company}</Text>
            <Text style={styles.meta}>{exp.duration}</Text>
            {exp.description.map((d, j) => (
              <View key={j} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{d}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* ================= EDUCATION ================= */}
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {p.education.map((edu, i) => (
          <View key={i} wrap={false}>
            <Text style={styles.role}>{edu.degree}</Text>
            <Text style={styles.meta}>{edu.institution} | {edu.year}</Text>
          </View>
        ))}

        {/* ================= PROJECTS ================= */}
        <Text style={styles.sectionTitle}>KEY PROJECTS</Text>
        {p.projects.map((proj, i) => (
          <View key={i} wrap={false} style={{ marginBottom: 12 }}>
            <Text style={styles.role}>{proj.title}</Text>
            {proj.description.map((d, j) => (
              <View key={j} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{d}</Text>
              </View>
            ))}
            <Text style={styles.meta}>Technologies: {proj.tech.join(', ')}</Text>
          </View>
        ))}

        {/* ================= CERTIFICATIONS & PUBLICATIONS ================= */}
        <View style={styles.twoColumn} wrap={false}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {p.certifications.map((c, i) => (
              <View key={i} wrap={false}>
                <Text style={styles.role}>{c.title}</Text>
                <Text style={styles.meta}>{c.date}</Text>
                <Text>{c.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>PUBLICATIONS</Text>
            {p.publications.map((pub, i) => (
              <View key={i} wrap={false}>
                <Text style={styles.role}>{pub.title}</Text>
                <Text style={styles.meta}>{pub.date}</Text>
                <Text>{pub.description}</Text>
                <Link src={pub.link} style={styles.link}>{pub.link}</Link>
              </View>
            ))}
          </View>
        </View>

        {/* ================= INTERESTS ================= */}
        <Text style={styles.sectionTitle}>INTERESTS & HOBBIES</Text>
        <Text>{p.hobbies.join(' • ')}</Text>

      </Page>
    </Document>
  );
}
