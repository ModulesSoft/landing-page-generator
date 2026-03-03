import type { Theme, Flow, Layout } from '../schemas';

// Dynamic import modules for code-splitting per landing
const themeModules = import.meta.glob('/src/landings/*/theme*.json', { eager: false });
const flowDesktopModules = import.meta.glob('/src/landings/*/flow*-desktop.json', { eager: false });
const flowMobileModules = import.meta.glob('/src/landings/*/flow*-mobile.json', { eager: false });
const flowModules = import.meta.glob('/src/landings/*/flow*.json', { eager: false }); // Fallback
const layoutModules = import.meta.glob('/src/landings/*/steps/*/*.json', { eager: false });
const namedLayoutModules = import.meta.glob('/src/landings/*/layouts/*.json', { eager: false }); // For named layouts (e.g., layouts/main-desktop.json)

/**
 * Resolves a project configuration by slug and optional variant.
 * If variant-specific files don't exist, it falls back to the base project files.
 * @param slug The landing page slug (e.g., 'sample')
 * @param variant Optional variant identifier (e.g., 'A', 'B')
 * @returns Validated theme and flow data for desktop and mobile
 * @throws Error if project not found or validation fails
 */
export async function getProjectConfig(slug: string, variant?: string): Promise<{ theme: Theme; flows: { desktop: Flow; mobile: Flow } }> {
  const themePath = variant ? `/src/landings/${slug}/theme-${variant}.json` : `/src/landings/${slug}/theme.json`;
  const fallbackThemePath = `/src/landings/${slug}/theme.json`;
  
  const flowDesktopPath = variant ? `/src/landings/${slug}/flow-${variant}-desktop.json` : `/src/landings/${slug}/flow-desktop.json`;
  const flowMobilePath = variant ? `/src/landings/${slug}/flow-${variant}-mobile.json` : `/src/landings/${slug}/flow-mobile.json`;
  const flowFallbackPath = variant ? `/src/landings/${slug}/flow-${variant}.json` : `/src/landings/${slug}/flow.json`; 
  
  const defaultFlowDesktopPath = `/src/landings/${slug}/flow-desktop.json`;
  const defaultFlowMobilePath = `/src/landings/${slug}/flow-mobile.json`;
  const defaultFlowFallbackPath = `/src/landings/${slug}/flow.json`;

  if (!themeModules[themePath] && !themeModules[fallbackThemePath]) {
    throw new Error(`Project "${slug}" not found.`);
  }

  // Load theme - try variant first, then fallback
  const themeModule = await (themeModules[themePath] || themeModules[fallbackThemePath])();
  const theme = (themeModule as any).default as Theme;

  // Load flows - try device-specific variants, then non-variant device-specific, then variant flow.json, then base flow.json
  // Desktop Flow Resolution
  const desktopSource = flowDesktopModules[flowDesktopPath] || 
                        flowDesktopModules[defaultFlowDesktopPath] || 
                        flowModules[flowFallbackPath] || 
                        flowModules[defaultFlowFallbackPath];
  
  // Mobile Flow Resolution
  const mobileSource = flowMobileModules[flowMobilePath] || 
                       flowMobileModules[defaultFlowMobilePath] || 
                       flowModules[flowFallbackPath] || 
                       flowModules[defaultFlowFallbackPath];

  if (!desktopSource || !mobileSource) {
    throw new Error(`Flows for project "${slug}" not found.`);
  }

  const [desktopFlowModule, mobileFlowModule] = await Promise.all([
    desktopSource(),
    mobileSource()
  ]);

  const desktopFlow = (desktopFlowModule as any).default as Flow;
  const mobileFlow = (mobileFlowModule as any).default as Flow;

  return { theme, flows: { desktop: desktopFlow, mobile: mobileFlow } };
}

/**
 * Resolves layouts for a specific step within a project.
 * @param slug The landing page slug
 * @param stepId The step identifier
 * @param variant Optional variant identifier
 * @returns Validated desktop and mobile layouts for the step
 * @throws Error if layouts not found or validation fails
 */
export async function getStepLayouts(slug: string, stepId: string, variant?: string): Promise<{ desktop: Layout; mobile: Layout }> {
  const desktopPath = variant ? `/src/landings/${slug}/steps/${stepId}/desktop-${variant}.json` : `/src/landings/${slug}/steps/${stepId}/desktop.json`;
  const fallbackDesktopPath = `/src/landings/${slug}/steps/${stepId}/desktop.json`;
  const mobilePath = variant ? `/src/landings/${slug}/steps/${stepId}/mobile-${variant}.json` : `/src/landings/${slug}/steps/${stepId}/mobile.json`;
  const fallbackMobilePath = `/src/landings/${slug}/steps/${stepId}/mobile.json`;

  const desktopSource = layoutModules[desktopPath] || layoutModules[fallbackDesktopPath];
  const mobileSource = layoutModules[mobilePath] || 
                       layoutModules[fallbackMobilePath] || 
                       desktopSource; // Ultimate fallback to desktop layout

  if (!desktopSource) {
    throw new Error(`Layouts for step "${stepId}" in project "${slug}" not found.`);
  }

  const [desktopModule, mobileModule] = await Promise.all([
    desktopSource(),
    (mobileSource || desktopSource)()
  ]);

  const desktop = (desktopModule as any).default as Layout;
  const mobile = (mobileModule as any).default as Layout;

  return { desktop, mobile };
}

/**
 * Resolves layouts by named path (e.g., "layouts/main" or "layouts/checkout").
 * Resolves to device-specific files: layouts/main-desktop.json and layouts/main-mobile.json.
 * @param slug The landing page slug
 * @param layoutPath The layout path (e.g., "layouts/main")
 * @param variant Optional variant identifier
 * @returns Validated desktop and mobile layouts
 * @throws Error if layouts not found or validation fails
 */
export async function getLayoutByPath(slug: string, layoutPath: string, variant?: string): Promise<{ desktop: Layout; mobile: Layout }> {
  // Build paths for desktop and mobile variants
  const desktopPath = variant 
    ? `/src/landings/${slug}/${layoutPath}-${variant}-desktop.json`
    : `/src/landings/${slug}/${layoutPath}-desktop.json`;
  const desktopFallbackPath = `/src/landings/${slug}/${layoutPath}-desktop.json`;
  
  const mobilePath = variant
    ? `/src/landings/${slug}/${layoutPath}-${variant}-mobile.json`
    : `/src/landings/${slug}/${layoutPath}-mobile.json`;
  const mobileFallbackPath = `/src/landings/${slug}/${layoutPath}-mobile.json`;

  const desktopSource = namedLayoutModules[desktopPath] || namedLayoutModules[desktopFallbackPath];
  const mobileSource = namedLayoutModules[mobilePath] || 
                       namedLayoutModules[mobileFallbackPath] || 
                       desktopSource;

  if (!desktopSource) {
    throw new Error(`Layout "${layoutPath}" in project "${slug}" not found.`);
  }

  const [desktopModule, mobileModule] = await Promise.all([
    desktopSource(),
    (mobileSource || desktopSource)()
  ]);

  const desktop = (desktopModule as any).default as Layout;
  const mobile = (mobileModule as any).default as Layout;

  return { desktop, mobile };
}