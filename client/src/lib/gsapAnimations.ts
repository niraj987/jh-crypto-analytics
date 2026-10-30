import gsap from 'gsap';

export class GsapEffects {
  /**
   * Staggered fade and slide entrance for bento grid cards
   */
  public static staggerCards(containerSelector: string, itemSelector: string): gsap.core.Tween {
    return gsap.fromTo(
      `${containerSelector} ${itemSelector}`,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }

  /**
   * Radial needle sweep for Buy/Sell score gauge
   */
  public static animateNeedle(needleElement: SVGElement | HTMLElement, targetAngle: number): gsap.core.Tween {
    return gsap.to(needleElement, {
      rotation: targetAngle,
      transformOrigin: 'bottom center',
      duration: 1.4,
      ease: 'elastic.out(1, 0.5)',
    });
  }

  /**
   * Smooth number counter animation
   */
  public static animateNumber(
    element: HTMLElement,
    startVal: number,
    endVal: number,
    decimals: number = 2,
    prefix: string = '',
    suffix: string = ''
  ): gsap.core.Tween {
    const obj = { val: startVal };
    return gsap.to(obj, {
      val: endVal,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (element) {
          element.innerText = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        }
      },
    });
  }

  /**
   * Flashes element cyan/green or rose based on price uptick/downtick
   */
  public static flashPrice(element: HTMLElement, isUp: boolean) {
    if (!element) return;
    const color = isUp ? 'rgba(0, 255, 136, 0.4)' : 'rgba(255, 51, 102, 0.4)';
    gsap.fromTo(
      element,
      { backgroundColor: color },
      { backgroundColor: 'transparent', duration: 0.8, ease: 'power2.out' }
    );
  }
}

