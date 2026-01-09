export type VideoProps = {
  id: string;
  reelId: string | null;
  reelUrl: string;
};

export type VideoModalProps = {
  video: VideoProps;
};

export type PartnerProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  links: string[];
};

export type PartnerModalProps = {
  partner: PartnerProps;
};

export type CoachProps = {
  id: number;
  image: string;
  name: string;
  game?: SportProps[];
};

export type CoachModalProps = {
  coach: CoachProps;
};

export type SportProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  packages?: MembershipProps[];
};

export type SportModalProps = {
  sport: SportProps;
};

export type MembershipProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  sessions_count: number;
  gender: "male" | "female" | "both";
  game_id: number;
  game?: SportProps;
};

export type MembershipModalProps = {
  membership: MembershipProps;
};
