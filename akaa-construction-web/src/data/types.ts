// Tipe data website AKAA Construction

export type WorkType = 'bangun-baru' | 'renovasi' | 'interior' | 'taman';
export type ProjectStatus = 'selesai' | 'berjalan';

export type ProjectImage = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  /** foto = hasil/lapangan, progress = tahap pengerjaan, render = desain 3D (bukan hasil jadi) */
  kind: 'foto' | 'progress' | 'render';
};

export type ProgressUpdate = {
  /** Format YYYY-MM-DD */
  date: string;
  stage: string;
  note?: string;
  images?: readonly ProjectImage[];
};

export type Project = {
  slug: string;
  name: string;
  workType: WorkType;
  /** Cukup tingkat kecamatan/kota, jangan alamat rumah */
  location?: string;
  status: ProjectStatus;
  year: number;
  scope?: string;
  cover: ProjectImage;
  images: readonly ProjectImage[];
  progress?: readonly ProgressUpdate[];
  featured: boolean;
  /** Link postingan Instagram sumber data */
  sourcePosts: readonly string[];
};

export type Promo = {
  id: string;
  title: string;
  terms: readonly string[];
  /** Format YYYY-MM-DD */
  startDate: string;
  endDate: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  points: readonly string[];
  icon: 'rumah' | 'renovasi' | 'interior' | 'taman' | 'material';
};
