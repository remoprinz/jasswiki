import { GetStaticPaths, GetStaticProps } from 'next';
import texte from '@/data/i18n/it.json';
import { pfadeDer, propsDer, UebersetzteSeite } from '@/components/wissen/UebersetzteSeite';

export default UebersetzteSeite;

export const getStaticPaths: GetStaticPaths = async () => ({ paths: pfadeDer('it', texte), fallback: false });

export const getStaticProps: GetStaticProps = async ({ params }) => propsDer('it', texte, params?.pfad as string[]);
