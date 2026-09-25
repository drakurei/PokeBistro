import cn from '../../utils/cn'

// Every dish visual goes through here: correct intrinsic size (no layout shift), lazy by default,
// eager + high priority when the image is part of the first screen, and the radial mask that melts
// the cream background of the sheet into the surface behind.
export default function DishImage({ product, priority = false, className, sizes, ...props }) {
  const { image, imageSet } = product
  const srcSet = imageSet?.srcSet

  return (
    <picture>
      {imageSet?.avif && <source type="image/avif" srcSet={imageSet.avif} sizes={sizes} />}
      <img
        src={image}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt=""
        width={imageSet?.width ?? 512}
        height={imageSet?.height ?? 410}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn('dish-image', className)}
        {...props}
      />
    </picture>
  )
}
