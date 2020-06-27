import React from "react";
import { LANG, T } from "../../../utils/i18n";

interface IProps {
  preview: boolean;
  surveyName: string;
}

class LogoBanner extends React.Component<IProps> {
  render() {
    return (
      <div className="fixed top-0 z-40 flex items-center w-full h-8 px-4 font-medium text-white bg-indigo-600">
        {this.props.preview && (
          <div className="mr-4 font-medium text-indigo-800 whitespace-no-wrap">
            {T(LANG.preview.title)}
          </div>
        )}

        <span
          className="truncate"
          dangerouslySetInnerHTML={{ __html: this.props.surveyName }}
        ></span>
      </div>
    );
  }
}

export default LogoBanner;
