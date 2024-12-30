import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog } from "@/components/shared/dialog/Dialog";
import { ExternalLink, Plus } from "lucide-react";

const defaultIframeContent = `<iframe src='${process.env.NEXT_PUBLIC_IFRAME_URL}/{{logo}}' width='650px' height='500px'></iframe>`;

export const ShareIframe = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openShareIframe = useCallback(() => {
    setIsOpen(true);
  }, []);
  const [content, setContent] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const { toast } = useToast();
  const buildIframeContent = useCallback(() => {
    setContent(defaultIframeContent.toString().replace("{{logo}}", logoUrl ? `?logoUrl=${logoUrl}` : ""));
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

        <p className={"text-sm font-semibold my-3"}>Preview of what it looks like</p>
        <div className={"max-h-[300px]"} dangerouslySetInnerHTML={createHtmlContent()}></div>
      </Dialog>
      <div className={"flex justify-end mb-5"}>
        <Button
          onClick={openShareIframe}
          className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-shimmer"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
          Add to My Site
          <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      </div>
    </>
  );
};
