
import { PresetPrompt, ImageCategory } from './types';

export const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: '2rc-ecm-diagram',
    title: '2-RC ECM Schematic',
    category: ImageCategory.SYSTEM_MODEL,
    description: 'Professional 2-RC Thevenin Equivalent Circuit diagram with OCV, R0, and two polarization branches (R1-C1, R2-C2).',
    prompt: 'Professional scientific illustration of a 2-RC Thevenin Equivalent Circuit Model for a lithium-ion battery. The diagram includes: an ideal voltage source labeled OCV(SOC, T), a series resistor R0, and two parallel RC branches (R1, C1) and (R2, C2) in series. Clean vector art style, thin elegant lines, San-serif typography, soft blue and grey color palette. White background, high-resolution academic paper quality. No glowing effects, matte finish.'
  },
  {
    id: 'thermal-balance-nature',
    title: 'Lumped Thermal Balance',
    category: ImageCategory.THERMAL,
    description: 'An elegant 3D visualization of the Lumped Energy Balance equation, showing heat generation and dissipation.',
    prompt: 'Scientific 3D cutaway of a smartphone battery cell showing thermal dynamics. Subtle red-to-blue thermal gradient inside the cell. Minimalist arrows indicating internal heat generation (Q_gen) from Joule heating and polarization. External thin arrows representing convective cooling (hA). Academic journal style, similar to Nature Materials illustrations. Soft lighting, matte materials, pastel colors, white background, precise annotations.'
  },
  {
    id: 'power-decomp-science',
    title: 'System Power Decomposition',
    category: ImageCategory.DECOMPOSITION,
    description: 'Exploded view of smartphone subsystems (CPU, Display, GPS, Net) with proportional energy flow paths.',
    prompt: 'Exploded 3D view of a high-end smartphone with a focus on power distribution. Minimalist architectural rendering. Subtle energy flow lines of varying thickness representing P_disp, P_cpu, P_net, and P_gps diverging from the battery. Clean matte grey components, muted professional colors (navy, teal, sage). Flat lighting, high-quality vector-like rendering, Science journal aesthetic. Transparent casing.'
  },
  {
    id: 'soh-arrhenius-surface',
    title: 'Aging Sensitivity Map',
    category: ImageCategory.MICRO_SCALE,
    description: 'A 3D scientific surface plot showing SOH degradation rate as a function of Temperature and Current (Arrhenius law).',
    prompt: 'A professional 3D scientific surface plot showing the battery degradation rate (dSOH/dt). X-axis is Temperature (Tb), Y-axis is Current (I). The surface is smooth with a professional color gradient (Viridis or Magma map). Annotations pointing to the Arrhenius acceleration zone. High-quality MATLAB/Python-style rendering for academic journals. White background, clean grid lines, minimalist axis labels.'
  },
  {
    id: 'swollen-aging-comparison',
    title: 'Physical Aging Comparison',
    category: ImageCategory.AGING,
    description: 'A clean, studio-lit scientific comparison of a new pouch cell vs an aged swollen cell.',
    prompt: 'Academic studio photography style comparison. Left: A pristine, thin, black lithium-ion pouch battery. Right: A slightly swollen, aged pouch battery. Clean white background, soft diffused natural lighting. Focus on the geometry change. Professional markings. No dramatic or cinematic effects. Realistic, high-resolution laboratory documentation style.'
  },
  {
    id: 'coupling-chain-logic',
    title: 'Model Coupling Logic',
    category: ImageCategory.SYSTEM_MODEL,
    description: 'A high-level conceptual flow showing how usage signals convert to current and impact temperature/health.',
    prompt: 'Professional academic flowchart/infographic. Usage Signals -> Total Power -> Battery Current -> SOC/Voltage -> Heat generation -> Temperature -> SOH. Elegant block-arrow design, thin line weights, subtle shadows. Soft professional color coding for different modules (Electro: Blue, Thermal: Red, Aging: Orange). High-end layout similar to Science magazine "How it Works" section. White background.'
  }
];
