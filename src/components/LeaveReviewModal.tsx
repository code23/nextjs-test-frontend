'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  NumberInput
} from "@heroui/react";
import { useState } from "react";

export default function LeaveReviewModal({ productId }: { productId: string }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          review,
          rating
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit review');
      }
      
      // set isSuccess to true
      setIsSuccess(true);

      // close modal
      // ?
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="inline-flex underline hover:decoration-secondary text-xs outline-none" onClick={onOpen}>Add new review</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Leave a review</ModalHeader>
              <ModalBody>
                {error && (
                  <div className="text-red-500 mb-4 text-sm">{error}</div>
                )}
                {isSuccess && (
                  <div className="text-green-500 mb-4 text-sm">Review submitted successfully.</div>
                )}
                <Input type="hidden" name="product_id" value={productId} />
                <Input
                  isRequired
                  label="Review"
                  placeholder="Review"
                  // errorMessage="Review cannot be empty."
                  // isInvalid={!review}
                  value={review}
                  onValueChange={setReview}
                  validate={() => review.length > 0 ? null : 'Review cannot be empty.'}
                />
                <NumberInput
                  isRequired
                  label="Rating"
                  placeholder="Enter the amount"
                  minValue={1} 
                  maxValue={5}
                  defaultValue={3}
                  value={rating}
                  onValueChange={setRating} 
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" radius="full" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" radius="full" onPress={handleSubmit} isLoading={isLoading}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
