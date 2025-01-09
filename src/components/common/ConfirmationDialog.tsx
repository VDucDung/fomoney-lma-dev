import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  width?: string;
  confirmLoading?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnConfirm?: boolean; // New flag to control closing on confirm
}

export default function ConfirmationDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  width = "max-w-lg",
  confirmLoading = false,
  closeOnOutsideClick = true,
  closeOnConfirm = true, // Default to closing on confirm
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => closeOnOutsideClick && onOpenChange(isOpen)}
    >
      <DialogPortal>
        {/* Overlay */}
        <DialogOverlay className="fixed inset-0 bg-black/60" />

        {/* Content */}
        <DialogContent
          className={`fixed left-1/2 top-1/2 w-[90%] ${width} -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 shadow-lg`}
          onInteractOutside={(e) => {
            if (!closeOnOutsideClick) e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-left text-lg font-bold text-black">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-left text-sm text-gray-600">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex w-full justify-end gap-2">
            <Button
              className="bg-gray-300 text-black hover:bg-gray-400"
              onClick={() => onOpenChange(false)}
            >
              {cancelText}
            </Button>
            <Button
              disabled={confirmLoading}
              className="bg-yellow-600 text-white hover:bg-yellow-700"
              onClick={() => {
                onConfirm();
                if (closeOnConfirm) {
                  onOpenChange(false); // Close dialog if the flag is true
                }
              }}
            >
              {confirmLoading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
