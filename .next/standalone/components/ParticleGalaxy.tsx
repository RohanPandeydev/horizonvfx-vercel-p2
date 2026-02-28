"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particle galaxy
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount);

    const color1 = new THREE.Color(0x3b82f6); // Blue
    const color2 = new THREE.Color(0x10b981); // Green
    const color3 = new THREE.Color(0x8b5cf6); // Purple

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Create spiral galaxy shape
      const radius = Math.random() * 25;
      const spinAngle = radius * 0.5;
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3);
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);

      posArray[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      posArray[i3 + 1] = (Math.random() - 0.5) * (5 - radius * 0.1) + randomY;
      posArray[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Mix colors based on position
      const mixedColor = color1.clone();
      mixedColor.lerp(color2, Math.random());
      mixedColor.lerp(color3, Math.random() * 0.5);

      colorsArray[i3] = mixedColor.r;
      colorsArray[i3 + 1] = mixedColor.g;
      colorsArray[i3 + 2] = mixedColor.b;

      sizesArray[i] = Math.random() * 2;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizesArray, 1)
    );

    // Custom shader material for glowing particles
    const particlesMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float size;
        varying vec3 vColor;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // Gentle wave motion
          modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 0.5) * 0.5;
          modelPosition.x += cos(uTime * 0.3 + modelPosition.z * 0.3) * 0.3;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;
          gl_PointSize = size * uPixelRatio * (20.0 / -viewPosition.z);

          vColor = color;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          // Create circular particle
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);

          vec3 finalColor = vColor * strength;
          gl_FragColor = vec4(finalColor, strength);
        }
      `,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient glow
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse following
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Rotate entire galaxy based on mouse
      particles.rotation.y = mouseRef.current.x * 0.1;
      particles.rotation.x = mouseRef.current.y * 0.1;

      // Slow constant rotation
      particles.rotation.z = elapsedTime * 0.02;

      // Update shader
      particlesMaterial.uniforms.uTime.value = elapsedTime;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      particlesMaterial.uniforms.uPixelRatio.value = Math.min(
        window.devicePixelRatio,
        2
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
