import {
  ACESFilmicToneMapping,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
} from 'three'

// Builds the hero Poké Ball inside `container` (a square element) and returns a dispose function.
// Everything created here is released on dispose: renderer, geometries, materials, listeners, observers.
export function createPokeball(container) {
  const scene = new Scene()
  const camera = new PerspectiveCamera(28, 1, 0.1, 20)
  camera.position.set(0, 0, 4.6)

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.domElement.setAttribute('aria-hidden', 'true')
  container.appendChild(renderer.domElement)

  // ----- Materials (brand palette) -----
  const lacquer = new MeshPhysicalMaterial({
    color: 0xc9211b,
    roughness: 0.28,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  })
  const porcelain = new MeshPhysicalMaterial({
    color: 0xf4f1ea,
    roughness: 0.42,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
  })
  const ink = new MeshStandardMaterial({ color: 0x17151a, roughness: 0.55, metalness: 0.05 })

  // ----- Geometry -----
  const top = new SphereGeometry(1, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2 - 0.045)
  const bottom = new SphereGeometry(1, 96, 48, 0, Math.PI * 2, Math.PI / 2 + 0.045, Math.PI / 2)
  const belt = new TorusGeometry(0.985, 0.075, 24, 128)
  const buttonBase = new CylinderGeometry(0.26, 0.26, 0.1, 48)
  const buttonRing = new TorusGeometry(0.2, 0.035, 16, 64)
  const buttonDisc = new CylinderGeometry(0.17, 0.17, 0.08, 48)
  const buttonDot = new CylinderGeometry(0.07, 0.07, 0.04, 32)

  const ball = new Group()
  ball.add(new Mesh(top, lacquer), new Mesh(bottom, porcelain))

  const beltMesh = new Mesh(belt, ink)
  beltMesh.rotation.x = Math.PI / 2
  ball.add(beltMesh)

  // The button sits on the belt, facing the camera
  const button = new Group()
  const base = new Mesh(buttonBase, ink)
  base.rotation.x = Math.PI / 2
  base.position.z = 0.96
  const ring = new Mesh(buttonRing, ink)
  ring.position.z = 1.03
  const disc = new Mesh(buttonDisc, porcelain)
  disc.rotation.x = Math.PI / 2
  disc.position.z = 1.0
  const dot = new Mesh(buttonDot, ink)
  dot.rotation.x = Math.PI / 2
  dot.position.z = 1.05
  button.add(base, ring, disc, dot)
  ball.add(button)

  // A tilt/parallax group around the spinning ball
  const rig = new Group()
  rig.rotation.x = 0.32
  rig.add(ball)
  scene.add(rig)

  // ----- Lights -----
  scene.add(new HemisphereLight(0xfff4e0, 0x3c3944, 1.4))
  const key = new DirectionalLight(0xffffff, 2.4)
  key.position.set(3, 4, 5)
  const rim = new DirectionalLight(0xffe0b0, 1.1)
  rim.position.set(-4, 1.5, -3)
  const fill = new DirectionalLight(0xdbe7ff, 0.5)
  fill.position.set(-2, -3, 4)
  scene.add(key, rim, fill)

  // ----- Interaction / loop -----
  const target = { x: 0, y: 0 }
  const current = { x: 0, y: 0 }
  let running = true
  let visible = true

  const onPointerMove = (event) => {
    target.x = (event.clientX / window.innerWidth - 0.5) * 2
    target.y = (event.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  const resize = () => {
    const size = Math.max(1, Math.min(container.clientWidth, container.clientHeight))
    renderer.setSize(size, size, false)
    renderer.domElement.style.width = `${size}px`
    renderer.domElement.style.height = `${size}px`
    camera.aspect = 1
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)
  resize()

  // Pause when off-screen or when the tab is hidden
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  intersection.observe(container)
  const onVisibility = () => {
    running = document.visibilityState === 'visible'
  }
  document.addEventListener('visibilitychange', onVisibility)

  const start = performance.now()
  renderer.setAnimationLoop((now) => {
    if (!running || !visible) return
    const t = (now - start) / 1000
    current.x = MathUtils.lerp(current.x, target.x, 0.06)
    current.y = MathUtils.lerp(current.y, target.y, 0.06)
    ball.rotation.y = t * 0.16 // one turn every ~40 s
    rig.rotation.y = current.x * 0.14
    rig.rotation.x = 0.32 + current.y * 0.12
    rig.position.y = Math.sin(t * 1.4) * 0.05
    renderer.render(scene, camera)
  })

  return function dispose() {
    renderer.setAnimationLoop(null)
    window.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('visibilitychange', onVisibility)
    observer.disconnect()
    intersection.disconnect()
    ;[top, bottom, belt, buttonBase, buttonRing, buttonDisc, buttonDot].forEach((geometry) =>
      geometry.dispose(),
    )
    ;[lacquer, porcelain, ink].forEach((material) => material.dispose())
    renderer.dispose()
    if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
  }
}
