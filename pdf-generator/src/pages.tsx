import React from 'react';
import { Page, Text, View, Image, Svg } from '@react-pdf/renderer';
import { styles, colors } from './theme';
import { RedGeometricArt, PageHeader } from './components/SvgBackgrounds';
import * as path from 'path';
import * as fs from 'fs';

const getAssetUrl = (filename: string) => {
  const filePath = path.join('C:', 'Users', 'TINGO-AI-010', 'Documents', 'prof', 'assets', filename);
  return fs.readFileSync(filePath);
};

// 1. COVER PAGE
export const CoverPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    
    <View style={{ flex: 1, justifyContent: 'center', marginTop: 80 }}>
      <View style={{ marginBottom: 40 }}>
        <Text style={styles.titleLarge}>OOU FUTURE TECH</Text>
        <Text style={styles.titleLarge}>CONFERENCE /</Text>
        <Text style={styles.titleLarge}>STARTUP SUMMIT 2026</Text>
        <View style={{ width: 60, height: 4, backgroundColor: colors.white, marginTop: 10 }} />
      </View>

      <Text style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>
        Building Ogun State’s Digital Innovation Future
      </Text>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <RedGeometricArt />
      </View>

      <View style={styles.coverFooter}>
        <View style={styles.coverLabelValueGroup}>
          <View style={styles.coverLabelLine}>
             <Text style={styles.coverLabel}>CONVENER:</Text>
             <Text style={styles.coverValue}>ADEMUWAGUN MAYOKUN PRECIOUS</Text>
          </View>
        </View>
        <View style={styles.coverLabelValueGroup}>
          <View style={styles.coverLabelLine}>
             <Text style={styles.coverLabel}>THEME:</Text>
             <Text style={{ ...styles.coverValue, maxWidth: 350 }}>THE NEXT FRONTIER: BUILDING AFRICA'S DIGITAL FUTURE</Text>
          </View>
        </View>
      </View>
    </View>
  </Page>
);

// 2. STARTUP SUMMIT 2026 (THE FOCUS)
export const StartupSummitPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80 }}>
      {/* Hero Image */}
      <View style={{ ...styles.heroImage, height: 240, marginBottom: 30 }}>
        <Image src={getAssetUrl('20260327_110708.jpg')} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </View>

      <Text style={styles.titleMedium}>STARTUP SUMMIT 2026</Text>
      <View style={styles.dividerRed} />
      <Text style={styles.body}>
        A high-impact innovation tour designed to build the next generation of founders across Olabisi Onabanjo University.
      </Text>
      
      <View style={{ marginTop: 40 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.coverLabel}>DATE:</Text>
          <Text style={styles.body}>May 29th, 2026</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.coverLabel}>FORMAT:</Text>
          <Text style={styles.body}>3 Satellite Campuses</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.coverLabel}>FOCUS:</Text>
          <Text style={styles.body}>Startup Creation & Execution</Text>
        </View>
      </View>
    </View>
  </Page>
);

// 3. ABOUT THE CONFERENCE
export const AboutPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    
    <View style={{ marginTop: 80 }}>
      {/* Hero Image */}
      <View style={{ ...styles.heroImage, height: 260, marginBottom: 30 }}>
        <Image src={getAssetUrl('DSC00734.png')} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </View>

      <Text style={{ ...styles.titleLarge, fontSize: 42, marginBottom: 5 }}>About The</Text>
      <Text style={{ ...styles.titleLarge, fontSize: 42, marginBottom: 30 }}>Conference</Text>

      <Text style={styles.body}>
        The OOU Future Tech Conference is a university-wide innovation platform designed to address the rising rate of cybercrime by creating structured pathways for students to enter ethical, productive, and globally competitive technology careers.
      </Text>
      
      <Text style={styles.body}>
        The conference connects students with industry leaders, emerging technologies, and real opportunities for skills development, startup creation, and investment readiness. It is not just a conference, it is the foundation of a long-term institutional innovation ecosystem.
      </Text>
    </View>
  </Page>
);

// 4. PURPOSE
export const PurposePage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80, justifyContent: 'center', flex: 1 }}>
      <Text style={styles.subtitle}>Purpose</Text>
      <Text style={styles.titleMedium}>WHY THIS SUMMIT EXISTS</Text>
      <View style={styles.dividerRed} />
      <Text style={{ ...styles.body, maxWidth: 450 }}>
        To redirect students from cybercrime into digital technology by creating structured pathways into innovation, startup creation, and real economic opportunities.
      </Text>
    </View>
  </Page>
);

// 4. PARTNERSHIP PACKAGES (TABLE LAYOUT)
export const PartnershipPackagesPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 60 }}>
      <Text style={styles.titleLarge}>Partnership Packages</Text>
      
      {/* Table Header */}
      <View style={{ flexDirection: 'row', backgroundColor: colors.red, padding: 10, marginTop: 30 }}>
        <View style={{ flex: 1.5 }}><Text style={{ color: colors.white, fontSize: 13, fontFamily: 'Helvetica-Bold' }}>Benefit</Text></View>
        <View style={{ flex: 1 }}><Text style={{ color: colors.white, fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Gold (₦500,000)</Text></View>
        <View style={{ flex: 1 }}><Text style={{ color: colors.white, fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Silver (₦300,000)</Text></View>
        <View style={{ flex: 1 }}><Text style={{ color: colors.white, fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Bronze (₦200,000)</Text></View>
      </View>

      {/* Table Rows */}
      {[
        ['Status', 'Lead Strategic Partner', 'Prominent Partner', 'Support Partner'],
        ['Speaking Role', 'Keynote Opportunity', 'Panel Participation', '—'],
        ['Brand Placement', 'All Event Materials', 'Digital Materials', 'Conference Materials'],
        ['Exhibition Space', 'Physical Space', 'Physical Space', '—'],
        ['Media & PR', 'Inclusion in publications', 'General Recognition', 'General Recognition'],
        ['Engagement', 'Direct Student Session', 'Access to Session', 'Networking Session'],
        ['Special Initiatives', 'Investors Hub & Startup Pipeline', '—', '—'],
        ['Certification', 'Strategic Partnership', 'Partnership', 'Support'],
      ].map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
          <View style={{ flex: 1.5 }}><Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold' }}>{row[0]}</Text></View>
          <View style={{ flex: 1 }}><Text style={{ fontSize: 9 }}>{row[1]}</Text></View>
          <View style={{ flex: 1 }}><Text style={{ fontSize: 9 }}>{row[2]}</Text></View>
          <View style={{ flex: 1 }}><Text style={{ fontSize: 9 }}>{row[3]}</Text></View>
        </View>
      ))}
    </View>
  </Page>
);

// 5. WHY PARTNER WITH US + IMPACT TRANSITION
export const WhyPartnerPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80, flex: 1 }}>
      <Text style={styles.titleMedium}>WHY PARTNER WITH US</Text>
      <View style={styles.dividerRed} />
      <View style={{ marginBottom: 40 }}>
        {[
          'Access to 1,850+ active tech students',
          'Direct connection to emerging startups',
          'Visibility across multiple campuses',
          'Positioning as a tech ecosystem leader'
        ].map((item, i) => (
          <View key={i} style={styles.listItem}>
             <View style={styles.bullet} />
             <Text style={styles.bodyBold}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.05)', borderRadius: 4, padding: 20 }}>
         <View style={{ opacity: 0.1, ...styles.fullBleed }}>
            <Image src={getAssetUrl('20260327_110711.jpg')} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
         </View>
         <Text style={{ ...styles.titleLarge, fontSize: 52, textAlign: 'center' }}>2,500+ PARTICIPANTS</Text>
         <Text style={{ ...styles.titleLarge, fontSize: 32, textAlign: 'center', color: colors.red }}>REAL STARTUPS. REAL IMPACT.</Text>
      </View>
    </View>
  </Page>
);

// 8. FUTURE TECH CONFERENCE (PAST)
export const FutureTechPastPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80 }}>
      <Text style={styles.titleMedium}>FUTURE TECH CONFERENCE</Text>
      <View style={styles.dividerRed} />
      {[
        'Hosted over 2,500 participants',
        'University-wide innovation movement',
        'Focused on redirecting youth into tech'
      ].map((item, i) => (
        <View key={i} style={styles.listItem}>
           <View style={styles.bullet} />
           <Text style={styles.bodyBold}>{item}</Text>
        </View>
      ))}
      <View style={{ ...styles.heroImage, height: 200, marginTop: 40 }}>
        <Image src={getAssetUrl('DSC00734.png')} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </View>
    </View>
  </Page>
);

// 9. MEDIA COVERAGE
export const MediaCoveragePage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80 }}>
      <Text style={styles.titleMedium}>MEDIA COVERAGE</Text>
      <View style={styles.dividerRed} />
      
      <View style={{ marginTop: 20 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.coverLabel}>OGUNTODAY</Text>
          <Text style={{ fontSize: 9, color: colors.red }}>https://oguntoday.com.ng/entrepreneurship-and-innovation-among-ogun-youths/</Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.coverLabel}>TRIBUNE</Text>
          <Text style={{ fontSize: 9, color: colors.red }}>https://tribuneonlineng.com/200-level-oou-student-leads-tech-initiative-to-tackle-cybercrime-boost-innovation-in-ogun/</Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.coverLabel}>VANGUARD</Text>
          <Text style={{ fontSize: 9, color: colors.red }}>https://www.vanguardngr.com/2026/03/future-tech-conference-kicks-off-oou/</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 30, opacity: 0.5, marginTop: 40 }}>
         <Text style={styles.coverLabel}>OGTV</Text>
         <Text style={styles.coverLabel}>THE NATION</Text>
         <Text style={styles.coverLabel}>PUNCH</Text>
      </View>
    </View>
  </Page>
);

// 10. IMPACT METRICS
export const MetricsPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80 }}>
      <Text style={styles.titleMedium}>IMPACT METRICS</Text>
      <View style={styles.dividerRed} />
      
      <View style={styles.metricContainer}>
         <View style={styles.metricCard}>
            <Text style={styles.metricValue}>2,500+</Text>
            <Text style={styles.metricLabel}>Participants</Text>
         </View>
         <View style={styles.metricCard}>
            <Text style={styles.metricValue}>1,850+</Text>
            <Text style={styles.metricLabel}>Active Members</Text>
         </View>
         <View style={styles.metricCard}>
            <Text style={styles.metricValue}>500+</Text>
            <Text style={styles.metricLabel}>Founders Community</Text>
         </View>
         <View style={styles.metricCard}>
            <Text style={styles.metricValue}>8</Text>
            <Text style={styles.metricLabel}>Startups Created</Text>
         </View>
      </View>
    </View>
  </Page>
);

// 11. PARTNERS
export const PartnersPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80 }}>
      <Text style={styles.titleMedium}>PARTNERS</Text>
      <View style={styles.dividerRed} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 60 }}>
         <Text style={{ fontSize: 42, color: colors.white, fontFamily: 'Helvetica-Bold' }}>Raenest</Text>
         <Text style={{ fontSize: 42, color: colors.white, fontFamily: 'Helvetica-Bold' }}>Selar</Text>
      </View>

      <View style={{ padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
         <Text style={styles.body}>Built a 700+ student community for Raenest within OOU</Text>
      </View>
    </View>
  </Page>
);

// 12. COMMUNITY
export const CommunityPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ flex: 1, justifyContent: 'center', marginTop: 80 }}>
       <Text style={styles.titleMedium}>COMMUNITY</Text>
       <View style={styles.dividerRed} />
       <Text style={{ ...styles.body, fontSize: 18, lineHeight: 1.4 }}>
         A thriving ecosystem of builders, innovators, and founders shaping the future of technology in Ogun State.
       </Text>
    </View>
  </Page>
);

// 13. VISION
export const VisionPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ marginTop: 80, justifyContent: 'center', flex: 1 }}>
      <Text style={styles.titleMedium}>VISION</Text>
      <View style={styles.dividerRed} />
      {[
        'Redirect students from cybercrime',
        'Build a startup ecosystem',
        'Position OOU as a leading innovation hub'
      ].map((item, i) => (
        <View key={i} style={styles.listItem}>
           <View style={styles.bullet} />
           <Text style={styles.bodyBold}>{item}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// 14. CONTACT
export const ContactPage = () => (
  <Page size="A4" style={styles.fullPage}>
    <Svg style={styles.fullBleed} viewBox="0 0 595 842" width="100%" height="100%">
       <PageHeader />
    </Svg>
    <View style={{ flex: 1, justifyContent: 'center', marginTop: 80 }}>
       <Text style={styles.titleLarge}>CONNECT</Text>
       <View style={{ backgroundColor: colors.red, height: 2, width: 60, marginVertical: 30 }} />
       
       <View style={{ marginBottom: 40 }}>
         <Text style={styles.body}>ooufuturetech@gmail.com</Text>
         <Text style={{ ...styles.body, fontFamily: 'Helvetica-Bold' }}>ooufuturetech.com.ng</Text>
         <Text style={styles.body}>09023323399</Text>
       </View>

       <Text style={{ fontSize: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 20, letterSpacing: 2 }}>
         Shaping Africa’s Digital Future
       </Text>
    </View>
  </Page>
);
