import { Button } from "@/components/ui/button.tsx";
import { Dialog } from "@/components/shared/dialog/Dialog.tsx";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useToast } from "@/hooks/use-toast.ts";

const defaultIframeContent =
  "<iframe src='http://localhost:5173/{{logo}}' width='650px' height='500px'></iframe>";

export const ShareIframe = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openShareIframe = useCallback(() => {
    setIsOpen(true);
  }, []);
  const [content, setContent] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const { toast } = useToast();
  const buildIframeContent = useCallback(() => {
    setContent(
      defaultIframeContent
        .toString()
        .replace("{{logo}}", logoUrl ? `?logoUrl=${logoUrl}` : ""),
    );
  }, [logoUrl]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    toast({
      title: "Text copied to clipboard!",
      variant: "success",
    });
  };

  function createHtmlContent() {
    return {
      __html: content,
    };
  }

  useEffect(() => {
    buildIframeContent();
  }, [buildIframeContent]);

  return (
    <>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className={"mb-2 text-sm font-semibold"}>Enter the logo url here</p>
        <Input
          className={"text-xs"}
          placeholder="Direct url of your logo here"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />
        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="message">Paste this code in your website</Label>
          <Textarea
            className={"bg-r-gray-200 font-light"}
            readOnly={true}
            id="message"
            value={content}
            rows={6}
            onClick={copyToClipboard}
          />
        </div>
        <Button className={"mt-3 w-full"} onClick={copyToClipboard}>
          Copy
        </Button>

        <p className={"text-sm font-semibold my-3"}>
          Preview of what it looks like
        </p>
        <div
          className={"max-h-[300px]"}
          dangerouslySetInnerHTML={createHtmlContent()}
        ></div>
      </Dialog>
      <div className={"flex justify-end mb-5"}>
        <Button onClick={openShareIframe}>Share</Button>
      </div>
    </>
  );
};
