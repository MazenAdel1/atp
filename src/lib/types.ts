import { ReactNode } from "react";

export type VideoProps = {
  id: string;
  reelId: string | null;
  reelUrl: string;
};

export type PartnerProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  links: string[];
};

export type CoachProps = {
  id: number;
  image: string;
  name: string;
  game?: SportProps[];
};

export type SportProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  packages?: MembershipProps[];
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

export type MembershipCardProps = {
  image: string;
  sportName: string;
  href: number;
};

export type ModalProps = {
  trigger?: ReactNode;
  content: ((setIsOpen: (open: boolean) => void) => ReactNode) | ReactNode;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
};

export type AdminImagePickerProps = {
  id: string;
  label: string;
  file: File | null;
  initialSrc?: string;
  onChange: (file: File | null) => void;
  required?: boolean;
};

export type AdminPageShellProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  wideGrid?: boolean;
};

export type FormModalProps = {
  mode: "add" | "edit";
  endpoint: string;
  queryKey: string;
  title: string;
  triggerLabel: string;
  submitLabel?: string;
  children: ReactNode;
  disabled?: boolean;
  onTransformFormData?: (formData: FormData) => false | void;
  onSuccess?: () => void;
};
