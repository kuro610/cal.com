import { ExternalLinkIcon, ExclamationIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { HelpScout, useChat } from "react-live-chat-loader";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import showToast from "@calcom/lib/notification";
import Button from "@calcom/ui/Button";

import classNames from "@lib/classNames";
import { trpc } from "@lib/trpc";

import ContactMenuItem from "./ContactMenuItem";

interface HelpMenuItemProps {
  onHelpItemSelect: () => void;
}

export default function HelpMenuItem({ onHelpItemSelect }: HelpMenuItemProps) {
  const [rating, setRating] = useState<null | string>(null);
  const [comment, setComment] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [active, setActive] = useState(false);
  const [, loadChat] = useChat();
  const { t } = useLocale();

  const mutation = trpc.useMutation("viewer.submitFeedback", {
    onSuccess: () => {
      setDisableSubmit(true);
      showToast("Thank you, feedback submitted", "success");
      onHelpItemSelect();
    },
  });

  const onRatingClick = (value: string) => {
    setRating(value);
    setDisableSubmit(false);
  };

  const sendFeedback = async (rating: string, comment: string) => {
    mutation.mutate({ rating: rating, comment: comment });
  };

  return (
    <div className="w-full border-gray-300 bg-white shadow-sm">
      <div className="w-full py-5">
        <p className="mb-1 px-5 text-neutral-500">{t("resources").toUpperCase()}</p>
        <a
          onClick={() => onHelpItemSelect()}
          href="https://docs.cal.com/"
          target="_blank"
          className="flex w-full px-5 py-2 pr-4 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          rel="noreferrer">
          {t("support_documentation")}
          <ExternalLinkIcon
            className={classNames(
              "text-neutral-400 group-hover:text-neutral-500",
              "ml-1 h-5 w-5 flex-shrink-0 ltr:mr-3"
            )}
          />
        </a>
        <a
          onClick={() => onHelpItemSelect()}
          href="https://developer.cal.com/"
          target="_blank"
          className="flex w-full px-5 py-2 pr-4 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          rel="noreferrer">
          {t("developer_documentation")}
          <ExternalLinkIcon
            className={classNames(
              "text-neutral-400 group-hover:text-neutral-500",
              "ml-1 h-5 w-5 flex-shrink-0 ltr:mr-3"
            )}
          />
        </a>
        <div onClick={() => onHelpItemSelect()}>
          <ContactMenuItem />
        </div>
      </div>
    </div>
  );
}
