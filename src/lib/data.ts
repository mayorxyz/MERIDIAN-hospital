export type DeptId =
  | "cardiology"
  | "neurology"
  | "oncology"
  | "pediatrics"
  | "orthopedics"
  | "womens";

export interface Department {
  id: DeptId;
  name: string;
  tagline: string;
  description: string;
  baseCost: number;
  specialists: number;
  wait: string;
  conditions: string[];
  head: string;
}

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    tagline: "Heart disease diagnosed faster. Treated better.",
    description:
      "Board-certified cardiologists, a dedicated cath lab open around the clock, and same-week appointments for every new patient.",
    baseCost: 480,
    specialists: 24,
    wait: "Same week",
    conditions: ["Arrhythmia", "Heart failure", "Hypertension", "Preventive screening"],
    head: "Dr. Amara Osei",
  },
  {
    id: "neurology",
    name: "Neurology",
    tagline: "Care for what you can't see.",
    description:
      "Advanced EEG and 3T MRI imaging in-house, with a stroke response team on site every hour of the year.",
    baseCost: 520,
    specialists: 17,
    wait: "3 days",
    conditions: ["Migraine", "Epilepsy", "Stroke recovery", "Movement disorders"],
    head: "Dr. Elias Vandermeer",
  },
  {
    id: "oncology",
    name: "Oncology",
    tagline: "Precision treatment. Personalized to your biology.",
    description:
      "Genomic tumor profiling, on-site infusion suites, and a navigator who answers your calls within the hour.",
    baseCost: 640,
    specialists: 21,
    wait: "48 hours",
    conditions: ["Breast cancer", "Lung cancer", "Hematology", "Radiation therapy"],
    head: "Dr. Ingrid Halvorsen",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    tagline: "From newborn to teenager. We've got them.",
    description:
      "A child-life team on every floor, family rooms in every ward, and well-visits that never feel rushed.",
    baseCost: 260,
    specialists: 19,
    wait: "Next day",
    conditions: ["Well-child care", "Asthma & allergy", "Developmental care", "Adolescent health"],
    head: "Dr. Marisol Quintana",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    tagline: "Move without limits.",
    description:
      "Joint replacement with same-day discharge, sports medicine, and physical therapy under one roof.",
    baseCost: 420,
    specialists: 16,
    wait: "Same week",
    conditions: ["Joint replacement", "Sports injury", "Spine care", "Fracture clinic"],
    head: "Dr. Tomas Lindqvist",
  },
  {
    id: "womens",
    name: "Women's Health",
    tagline: "Care that understands you.",
    description:
      "Obstetrics, gynecology, and a birth center designed around comfort — with midwives and physicians on one team.",
    baseCost: 340,
    specialists: 23,
    wait: "2 days",
    conditions: ["Obstetrics", "Gynecology", "Fertility consults", "Menopause care"],
    head: "Dr. Priya Raghunathan",
  },
];

export interface Doctor {
  id: string;
  name: string;
  dept: DeptId;
  deptName: string;
  years: number;
  focus: string;
}

export const doctors: Doctor[] = [
  { id: "d01", name: "Amara Osei", dept: "cardiology", deptName: "Cardiology", years: 18, focus: "Interventional cardiology" },
  { id: "d02", name: "Daniel Reyes", dept: "cardiology", deptName: "Cardiology", years: 12, focus: "Electrophysiology" },
  { id: "d03", name: "Hannah Blum", dept: "cardiology", deptName: "Cardiology", years: 9, focus: "Preventive cardiology" },
  { id: "d04", name: "Elias Vandermeer", dept: "neurology", deptName: "Neurology", years: 22, focus: "Stroke & vascular neurology" },
  { id: "d05", name: "Sofia Marchetti", dept: "neurology", deptName: "Neurology", years: 14, focus: "Epilepsy" },
  { id: "d06", name: "Owen Blackwood", dept: "neurology", deptName: "Neurology", years: 7, focus: "Headache medicine" },
  { id: "d07", name: "Ingrid Halvorsen", dept: "oncology", deptName: "Oncology", years: 20, focus: "Medical oncology" },
  { id: "d08", name: "Samuel Adeyemi", dept: "oncology", deptName: "Oncology", years: 11, focus: "Radiation oncology" },
  { id: "d09", name: "Claire Fontaine", dept: "oncology", deptName: "Oncology", years: 8, focus: "Hematologic malignancies" },
  { id: "d10", name: "Marisol Quintana", dept: "pediatrics", deptName: "Pediatrics", years: 16, focus: "General pediatrics" },
  { id: "d11", name: "Jonas Weber", dept: "pediatrics", deptName: "Pediatrics", years: 10, focus: "Pediatric pulmonology" },
  { id: "d12", name: "Leila Haddad", dept: "pediatrics", deptName: "Pediatrics", years: 6, focus: "Neonatology" },
  { id: "d13", name: "Tomas Lindqvist", dept: "orthopedics", deptName: "Orthopedics", years: 21, focus: "Joint replacement" },
  { id: "d14", name: "Grace Nakamura", dept: "orthopedics", deptName: "Orthopedics", years: 13, focus: "Sports medicine" },
  { id: "d15", name: "Viktor Petrov", dept: "orthopedics", deptName: "Orthopedics", years: 9, focus: "Spine surgery" },
  { id: "d16", name: "Priya Raghunathan", dept: "womens", deptName: "Women's Health", years: 17, focus: "Obstetrics" },
  { id: "d17", name: "Nadia Okafor", dept: "womens", deptName: "Women's Health", years: 12, focus: "Gynecologic surgery" },
  { id: "d18", name: "Esther Lindgren", dept: "womens", deptName: "Women's Health", years: 8, focus: "Reproductive endocrinology" },
];

export const testimonials = [
  {
    quote: "I called at 8 a.m. with chest pain. By 8:40 I was on a table in the cath lab. Nobody asked me for a form first.",
    name: "Robert Calloway, 61",
    dept: "Cardiology patient",
  },
  {
    quote: "Our daughter's nurses learned her name — and ours — on the first night. That's the whole review.",
    name: "Jenna & Marcus Webb",
    dept: "Pediatrics family",
  },
  {
    quote: "My navigator called me back in twenty minutes. On a Sunday. During treatment, that's not small.",
    name: "Alice Tran, 44",
    dept: "Oncology patient",
  },
  {
    quote: "New knee, home the same evening, and a therapist in my living room two days later. I'm back on the tennis court.",
    name: "Gordon Fields, 68",
    dept: "Orthopedics patient",
  },
  {
    quote: "They treated my migraine like it mattered. After eleven years of being brushed off, that changed everything.",
    name: "Dana Whitfield, 35",
    dept: "Neurology patient",
  },
];

export const insurancePlans = [
  {
    name: "Meridian Blue PPO",
    type: "Preferred network",
    coverage: "Up to 90% in-network",
    detail: "Our house plan. Lowest copays, no referrals required, and pre-authorization handled by our team before your visit.",
  },
  {
    name: "State Medicaid",
    type: "Public plan",
    coverage: "Full essential benefits",
    detail: "Accepted across all six departments. Financial counselors on-site Tuesdays and Thursdays to help with enrollment.",
  },
  {
    name: "Medicare Advantage",
    type: "Seniors 65+",
    coverage: "Part A & B accepted",
    detail: "Annual wellness visits covered in full. We verify your benefits automatically 48 hours before any scheduled visit.",
  },
  {
    name: "Aetna HMO",
    type: "Managed care",
    coverage: "In-network at all locations",
    detail: "Referrals coordinated directly with your PCP's office — most approvals land within one business day.",
  },
  {
    name: "Cigna Open Access",
    type: "Open network",
    coverage: "No referral needed",
    detail: "See any Meridian specialist without gatekeeping. Out-of-pocket caps explained in writing before treatment begins.",
  },
];

export const team = [
  { name: "Helena Marsh", title: "Chief Executive Officer" },
  { name: "David Okonkwo", title: "Chief of Medicine" },
  { name: "Ruth Castellanos", title: "Chief Nursing Officer" },
  { name: "Peter Sørensen", title: "Director of Surgery" },
  { name: "Amara Osei", title: "Head of Cardiology" },
  { name: "Elias Vandermeer", title: "Head of Neurology" },
  { name: "Ingrid Halvorsen", title: "Head of Oncology" },
  { name: "Marisol Quintana", title: "Head of Pediatrics" },
  { name: "Tomas Lindqvist", title: "Head of Orthopedics" },
  { name: "Priya Raghunathan", title: "Head of Women's Health" },
  { name: "Yusuf Demir", title: "Director of Emergency" },
  { name: "Beatriz Coelho", title: "Patient Experience Lead" },
];

export const values = [
  {
    name: "Accuracy",
    text: "Double-checked diagnoses, published outcomes, and records you can actually read. We measure everything because you can't improve what you hide.",
  },
  {
    name: "Compassion",
    text: "Nurses with time to sit down. Doctors who say the hard things kindly. Care plans written for families, not just charts.",
  },
  {
    name: "Speed",
    text: "A 12-minute average ER door-to-doctor time. Same-week specialty appointments. Results called in, not mailed out.",
  },
  {
    name: "Transparency",
    text: "Prices in writing before treatment. Billing without surprises. And when we fall short, we tell you — then fix it.",
  },
];

export const journeySteps = [
  { step: "Refer", text: "Self-refer or come through your GP. No paperwork wall." },
  { step: "Book", text: "Same-week slots held for new patients in every department." },
  { step: "Consult", text: "A specialist, not a substitute. 30 minutes, minimum." },
  { step: "Treat", text: "One care team, one plan, one point of contact throughout." },
  { step: "Recover", text: "Follow-ups scheduled before you leave the building." },
];

export const hours = [
  { day: "Monday – Friday", time: "7:00 – 19:00", open: [7, 19] as const },
  { day: "Saturday", time: "8:00 – 14:00", open: [8, 14] as const },
  { day: "Sunday", time: "Clinic closed", open: null },
];

export const AVATAR_GRADIENTS = [
  "radial-gradient(circle at 30% 30%, #8fd3c7, #2e8b7a 70%)",
  "radial-gradient(circle at 30% 30%, #a8c4de, #1a3c5e 75%)",
  "radial-gradient(circle at 35% 25%, #c9e8e0, #3f7d70 70%)",
  "radial-gradient(circle at 30% 30%, #d6e6f5, #2b5a8a 75%)",
  "radial-gradient(circle at 40% 30%, #bfe3da, #1f6e60 72%)",
  "radial-gradient(circle at 30% 35%, #cdd9e8, #37536f 74%)",
  "radial-gradient(circle at 32% 28%, #a9dfd2, #256e5f 70%)",
  "radial-gradient(circle at 30% 30%, #bfd3ea, #1d456e 76%)",
];

export function nameHash(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h;
}

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
