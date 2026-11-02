import { GetStaticPaths, GetStaticProps } from 'next';
import texte from '@/data/i18n/fr.json';
import { pfadeDer, propsDer, UebersetzteSeite } from '@/components/wissen/UebersetzteSeite';

export default UebersetzteSeite;

export const getStaticPaths: GetStaticPaths = async () => ({ paths: pfadeDer('fr', texte), fallback: false });

export const getStaticProps: GetStaticProps = async ({ params }) => propsDer('fr', texte, params?.pfad as string[]);
