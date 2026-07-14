import React from 'react';
import { Document as PDFDocument } from '@react-pdf/renderer';
import {
  CoverPage,
  StartupSummitPage,
  PurposePage,
  AboutPage,
  PartnershipPackagesPage,
  WhyPartnerPage,
  FutureTechPastPage,
  MediaCoveragePage,
  MetricsPage,
  PartnersPage,
  CommunityPage,
  VisionPage,
  ContactPage
} from '../pages';

export const ProspectusDocument = () => (
  <PDFDocument
    title="OOU Future Tech Conference / Startup Summit 2026 Prospectus"
    author="OOU Future Tech"
    subject="Conference Prospectus"
  >
    <CoverPage />
    <StartupSummitPage />
    <PurposePage />
    <AboutPage />
    <PartnershipPackagesPage />
    <WhyPartnerPage />
    <FutureTechPastPage />
    <MediaCoveragePage />
    <MetricsPage />
    <PartnersPage />
    <CommunityPage />
    <VisionPage />
    <ContactPage />
  </PDFDocument>
);
