import MarkkoSDK from "@meetmarkko/markko-nextjs-sdk"
import { getSession } from "../actions"
import markkoConfig from "@/config/markko"
import { Button, Code, NumberInput } from "@heroui/react"
import Link from "next/link"
import Image from "next/image"
import Accordion from "@/components/Accordion"
import LeaveReviewModal from "@/components/LeaveReviewModal"
import moment from "moment"

const sdk = new MarkkoSDK(markkoConfig)
const vendorSlug = "atara"
const productSlug = "chopping-board"

const HeartIcon = () => {
  return (
    <svg width="18" height="16" viewBox="0 0 846 747" fill="none">
      <path className="group-hover:fill-black" fill="currentColor" d="M440.209 738.858L775.967 403.1C868.144 310.913 868.305 161.553 775.993 68.7666C683.687 -23.0672 534.261 -22.9312 442.1 69.2301L422.611 88.7195L403.121 69.2301C310.948 -22.9319 161.528 -23.0666 68.7881 69.2041C-23.087 161.551 -22.9257 310.92 69.2516 403.097L405.012 738.858C414.73 748.576 430.49 748.576 440.209 738.858Z" />
      <path className="fill-none" d="M775.976 403.093L440.216 738.853C430.497 748.572 414.737 748.572 405.018 738.853L69.2582 403.093C-22.9191 310.916 -23.0804 161.547 68.7947 69.2C161.535 -23.0707 310.955 -22.936 403.128 69.2261L422.617 88.7154L442.107 69.2261C534.268 -22.9353 683.693 -23.0713 776 68.7625C868.312 161.549 868.151 310.909 775.974 403.096L775.976 403.093ZM422.616 686.053L740.776 367.893C813.661 295.008 813.677 176.84 741.239 104.4C668.411 31.572 550.172 31.5613 477.306 104.426L440.218 141.514C430.499 151.233 414.739 151.233 405.02 141.514L367.932 104.426C295.068 31.5621 176.826 31.5714 104.439 103.963C31.5645 176.837 31.5791 295.016 104.465 367.896L422.616 686.053Z" />
    </svg>
  );
};

// star icon
const StarIcon = ({ size = 'w-4 h-4', color = 'text-black' }: { size?: string, color?: string }) => {
  return (
    <svg className={`${size} ${color} fill-current`} viewBox="0 0 23 22">
      <path d="M11.827 17.915L5.08 21.46l1.288-7.511L.912 8.63l7.542-1.096L11.827.7l3.372 6.834 7.542 1.096-5.457 5.32 1.288 7.511z"></path>
    </svg>
  )
}

// rating component
const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span className="block h-full overflow-hidden" key={index}>
          <StarIcon color={index < rating ? 'text-black' : 'text-gray-300'} />
        </span>
      ))}
    </div>
  )
}

export default async function Product8Page() {
  const session = await getSession()
  const oauth = session.oauth
  const response = await sdk.products.get(vendorSlug, productSlug, {
    condensed: '0',
    with: 'options.values,categories,cross_sells.categories,cross_sells.images,cross_sells.vendor,cross_sells.model_tags,up_sells.categories,up_sells.images,up_sells.vendor,up_sells.model_tags,images,model_tags,specifications,reviews'
  }, oauth)
  const product = response.data.products[0]

  return (
    <main className="bg-white text-black flex min-h-screen flex-col items-center py-24 xxpx-8 xxsm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <div className="container relative grid grid-cols-1 lg:items-start lg:mt-9 lg:gap-8 lg:grid-cols-12">
        <section className="relative flex flex-col transition-all duration-500 lg:sticky lg:self-start sm:gap-x-6 sm:flex-row-reverse sm:items-start lg:col-span-6 lg:top-48 h-full">
          <figure className="relative hidden h-full w-full overflow-hidden lg:block max-sm:justify-center max-sm:flex-shrink-0">
            <div className="relative cursor-zoom h-full">
              {product?.images[0]?.image_paths.original && (
                <div className="relative h-full w-full">
                  <Image
                    src={product?.images[0]?.image_paths.original}
                    alt={product?.name}
                    // fill={true}
                    width={701}
                    height={820}
                    className="pointer-events-none border border-grey-200 w-full h-auto z-20 object-contain rounded object-center"
                  />
                </div>
              )}
            </div>
          </figure>
        </section>
        <article className="flex flex-col gap-3 lg:sticky transition-all duration-500 lg:self-start lg:col-span-6 lg:top-12">
          {/* featured badge */}
          <div className="flex flex-wrap gap-2 max-lg:hidden">
            <div className="bg-black text-white font-heading text-xs leading-4 py-[0.15rem] px-2 font-medium uppercase rounded-full">
              <span>Featured</span>
            </div>
          </div>

          {/* title, price, rating */}
          <header className="max-lg:hidden">
            <h2 className="uppercase dynamic-break text-4xl">
              {product.name}
            </h2>
            <div className="flex flex-wrap items-baseline self-start text-2xl gap-x-2.5">                        
              <p className="shrink-0 font-medium  -tracking-wider">
                £{product.list_price}
              </p>
            </div>
            {product.reviews.length > 0 ? (
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-sm font-semibold">{product.reviews.average_rating}</span>
                <span className="text-sm font-semibold">{product.reviews.length} reviews</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-3">
                  <Rating rating={product.reviews.average_rating} />
                  
                  <Link href="#reviews" className="text-sm font-normal underline">
                    Leave a review
                  </Link>
              </div>
            )}
          </header>

          {/* description */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: product.content }} />
          </div>

          {/* add to cart */}
          <div className="flex items-end mt-3 gap-x-2 gap-y-6 lg:gap-6">
            <NumberInput labelPlacement="outside" className="w-[6rem]" aria-label="Qty"  defaultValue={1} minValue={1} maxValue={50} placeholder="Qty" />
            <Button radius="full" color="secondary" className="w-full">Add to cart</Button>
            <Button isIconOnly aria-label="Like" variant="bordered" color="secondary">
              <HeartIcon />
            </Button>
          </div>

          {/* vendor */}
          <article className="flex flex-wrap items-center justify-between gap-2 p-4 my-3 rounded bg-gray-100">
            <div className="flex items-start w-full gap-4">
                {/* logo */}
                {product.vendor.logo && (
                  <div className="relative flex-shrink-0 p-1 overflow-hidden bg-white rounded max-2xs:hidden w-16 h-16">
                    <Image
                      src={product.vendor.logo.image_paths['2xlarge']}
                      alt={product.vendor.store_name}
                      fill={true}
                      className="object-contain w-full h-full p-1"
                    />
                  </div>
                )}

                <div className="w-full space-y-2">
                    {/* info */}
                    <div className="flex flex-col-reverse items-start justify-between w-full gap-2 sm:gap-4 sm:flex-row">
                        <p>From <span className="font-bold dynamic-break">{ product.vendor.store_name }</span>
                          {product.vendor.address
                            ? ' in ' + product.vendor.address.city
                            : null}
                        </p>
                        {product.vendor.is_featured && (
                          <p className="bg-black font-heading uppercase text-white whitespace-nowrap text-xs leading-4 py-[0.15rem] px-2 font-medium rounded-full">
                            Featured
                          </p>
                        )}
                    </div>

                    {/* actions */}
                    <div className="flex items-center gap-4 text-sm font-medium shrink-0">
                        {/* message */}
                        {session?.isLoggedIn && (
                          <Link 
                            href={`/messages/${product.vendor.id}`}
                            className="underline font-normal"
                          >
                            Message
                          </Link>
                        )}

                        {/* view */}
                        <Link
                          href={`/vendors/${product.vendor.id}`}
                          className="underline font-normal"
                        >
                          View {product.vendor.store_name}
                        </Link>
                    </div>
                </div>
            </div>
          </article>
        </article>
      </div>

      <section className="container grid pt-8 md:pt-14 lg:pt-28 lg:flex-row gap-y-10 gap-x-28 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="uppercase text-4xl">Additional <span className="lg:block">information</span></h2>
        </div>
        <div className="lg:col-span-3">
          {/* <div dangerouslySetInnerHTML={{ __html: response.data.shipping.policy }} /> */}
          <Accordion items={[
              {
                title: 'Shipping',
                content: response.data?.shipping?.policy ? (
                  <div dangerouslySetInnerHTML={{ __html: response.data.shipping.policy }} />
                ) : (
                  <p>No shipping information available</p>
                )
              }
            ]} 
          />
        </div>
      </section>

      <section className="w-full mt-8 lg:mt-32 bg-secondary">
        <div className="container mx-auto grid py-10 lg:grid-cols-5 gap-x-9 gap-y-12 lg:py-20">
          <div className="gap-y-5 lg:col-span-2 lg:space-y-11">
            <h2 className="uppercase text-4xl">The creator</h2>
            {/* logo */}
            {product.vendor.logo && (
              <div className="relative flex-shrink-0 p-1 overflow-hidden bg-white rounded max-2xs:hidden w-16 h-16">
                <Image
                  src={product.vendor.logo.image_paths['2xlarge']}
                  alt={product.vendor.store_name}
                  fill={true}
                  className="object-contain w-full h-full p-1"
                />
              </div>
              )}
          </div>
          <div className="lg:col-span-3">
            <div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: response.data.bio }} />
          </div>
        </div>
      </section>

      <section id="reviews" className="w-full bg-gray-100 py-20">
        <div className="container mx-auto grid lg:grid-cols-5 lg:flex-row gap-y-4 gap-x-28">
          <div className="flex flex-col items-start gap-2 lg:col-span-2 md:items-center md:flex-row lg:flex-col lg:items-start lg:gap-x-0">
            <div className="flex flex-row gap-1 lg:flex-col">
              <h2 className="uppercase text-4xl">Reviews</h2>
              <h3 className="text-2xl">{product.reviews.average_rating}/5</h3>
              <p className="text-sm font-normal">{product.reviews.count} reviews</p>
              {session?.isLoggedIn && (
                <LeaveReviewModal productId={product.id} />
              )}
            </div>
          </div>
          <div className="w-full lg:col-span-3 flex flex-col gap-4">
            {product.reviews.count > 0 ? product.reviews.resource.map((review: any) => (
              <div key={review.id}>
                <p className="text-xs font-normal text-gray-500">{review.user.first_name} {review.user.last_name} - {moment(review.posted_at).fromNow()}</p>
                <blockquote className="italic">&ldquo;{review.review}&rdquo;</blockquote>
                <div className="flex items-center gap-2">
                  <Rating rating={review.rating} />
                  <p className="text-sm font-bold">{Number(review.rating).toFixed(0)}/5</p>
                </div>
              </div>
            )) : (
              <p>This product has no reviews yet - be the first to leave a review!</p>
            )}
          </div>
        </div>
      </section>

      <div className="mt-96"></div>
      <Code id="response" className="container whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
        {JSON.stringify(response, null, 2)}
      </Code>
    </main>
  )
}                                   
