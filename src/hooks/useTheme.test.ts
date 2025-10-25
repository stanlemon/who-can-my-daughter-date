import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  let matchMediaMock: { matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')

    matchMediaMock = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock))
  })

  it('defaults to system theme mode', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.themeMode).toBe('system')
  })

  it('uses light theme when system prefers light', () => {
    matchMediaMock.matches = false
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('uses dark theme when system prefers dark', () => {
    matchMediaMock.matches = true
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('adds dark class to document when theme is dark', () => {
    matchMediaMock.matches = true
    renderHook(() => useTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when theme is light', () => {
    matchMediaMock.matches = false
    document.documentElement.classList.add('dark')
    renderHook(() => useTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggles from system light to dark', () => {
    matchMediaMock.matches = false
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(result.current.themeMode).toBe('dark')
  })

  it('toggles from system dark to light', () => {
    matchMediaMock.matches = true
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
    expect(result.current.themeMode).toBe('light')
  })

  it('toggles from light to dark', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setThemeMode('light')
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(result.current.themeMode).toBe('dark')
  })

  it('toggles from dark to light', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setThemeMode('dark')
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
    expect(result.current.themeMode).toBe('light')
  })

  it('persists theme mode to localStorage', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setThemeMode('dark')
    })

    expect(localStorage.getItem('theme-mode')).toBe('dark')
  })

  it('loads theme mode from localStorage', () => {
    localStorage.setItem('theme-mode', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.themeMode).toBe('dark')
  })

  it('listens to system theme changes', () => {
    matchMediaMock.matches = false
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')

    matchMediaMock.matches = true
    const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1]
    act(() => {
      changeHandler({ matches: true } as MediaQueryListEvent)
    })

    expect(result.current.theme).toBe('dark')
  })

  it('cleans up media query listener on unmount', () => {
    const { unmount } = renderHook(() => useTheme())
    unmount()
    expect(matchMediaMock.removeEventListener).toHaveBeenCalled()
  })
})
