import { StyleSheet, Font } from '@react-pdf/renderer';

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
  gray: '#A0AEC0',
  border: '#333333',
};

export const styles = StyleSheet.create({
  // Page Styles
  fullPage: {
    backgroundColor: colors.black,
    padding: 40,
    color: colors.white,
    fontFamily: 'Helvetica',
  },
  
  fullBleed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Header Component
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  headerDate: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
  },

  // Typography
  titleLarge: {
    fontSize: 52,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.1,
    letterSpacing: -1,
    marginBottom: 15,
  },
  titleMedium: {
    fontSize: 42,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.2,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 30,
  },
  body: {
    fontSize: 13,
    lineHeight: 1.6,
    marginBottom: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  bodyBold: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },

  // Layout Helpers
  heroImage: {
    width: '100%',
    height: 300,
    marginBottom: 40,
  },
  contentImage: {
    width: '100%',
    height: 250,
    marginTop: 20,
  },
  
  // Cover Specific
  coverFooter: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 20,
    flexDirection: 'column',
  },
  coverLabelValueGroup: {
    marginBottom: 15,
  },
  coverLabelLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverLabel: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    marginRight: 10,
  },
  coverValue: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.gray,
  },

  // Lists
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 1,
    backgroundColor: colors.white,
    marginTop: 8,
    marginRight: 10,
  },
  // Utility Classes
  dividerRed: {
    backgroundColor: colors.red,
    height: 1,
    width: 40,
    marginVertical: 20,
  },
  dividerGray: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
  
  // Metric Styles
  metricContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  metricCard: {
    width: '45%',
    marginBottom: 30,
  },
  metricValue: {
    fontSize: 42,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    letterSpacing: -1,
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.gray,
    marginTop: 5,
  },

  // Tier Styles
  tierCard: {
    marginBottom: 30,
    paddingRight: 20,
  },
  tierTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 5,
  },
  tierPrice: {
    fontSize: 18,
    color: colors.red,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },
  tierDesc: {
    fontSize: 11,
    color: colors.gray,
    marginBottom: 15,
  },
});
