import useBreakpoint from './useBreakpoint'

/**
 * Телефон (< 768). Для шапки на ноутбуках используйте useBreakpoint().isCompact
 */
export default function useIsMobile() {
  return useBreakpoint().isMobile
}
