// import modal_styles from "./styles";
import modal_styles from "../styles/Modal.module.css";
import buttons_styles from "../styles/Buttons.module.css";
import Image from "next/Image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  animatedModal,
  backdropModal,
  errorVariant,
} from "../animations/AnimationVariants";

export default function Modal(props) {
  const titleInputRef = useRef(null);
  const linkInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const tagInputRef = useRef(null);

  const [allFieldValidated, setAllFieldValidated] = useState(false);
  const [tagHelp, setTagHelp] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [tool, setTool] = useState({
    title: "",
    link: "",
    description: "",
    tags: new Array(),
  });

  useEffect(() => {
    setTool({
      title: "",
      link: "",
      description: "",
      tags: new Array(),
    });

    setAllFieldValidated(false);
  }, [props.state.shouldShowModal]);

  const HandleAddTool = (e) => {
    e.preventDefault();
    allFieldValidated === true && props.addTool(tool);
  };

  const validateUniqueName = () => {
    const curated_title = titleInputRef.current.value.trim();
    const titles = props.state.tools.filter(
      (tool) => tool.title === curated_title
    );
    setHasError(titles.length > 0);
  };

  const checkAllFieldsFilled = () => {
    setTool({
      ...tool,
      title: titleInputRef.current.value,
      description: descriptionInputRef.current.value,
      link: linkInputRef.current.value,
    });

    const validated =
      titleInputRef.current.value.length > 0 &&
      descriptionInputRef.current.value.length > 0 &&
      linkInputRef.current.value.length > 0 &&
      tagInputRef.current.value.trim().length === 0 &&
      !hasError;

    setAllFieldValidated(validated);
  };

  const addNewTag = (tag) => {
    const uniqueTags = new Set(tool.tags);
    uniqueTags.add(tag);
    const newTags = [...uniqueTags];

    setTool({ ...tool, tags: newTags });
  };

  const removeTag = (tag) => {
    const uniqueTags = new Set(tool.tags);
    uniqueTags.delete(tag);
    const newTagsArray = [...uniqueTags];
    console.log(newTagsArray);
    setTool({ ...tool, tags: newTagsArray });

    newTagsArray.length === 0 ? setAllFieldValidated(false) : "";
  };

  const handleSpace = (e) => {
    const value = e.target.value.trim().split(" ")[0];
    var keyCode = e.which || e.keyCode;

    switch (keyCode) {
      case 32:
        if (value.length > 0) {
          addNewTag(value);
          tagInputRef.current.value = null;
        }
        break;

      case 13:
        HandleAddTool(e);
        break;
    }

    if (!value) {
      tagInputRef.current.value = null;
    }
  };

  const closeAndResetModal = () => {
    titleInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    tagInputRef.current.value = "";
    linkInputRef.current.value = "";
    setHasError(false);
    props.showModal(false, null, false);
  };

  useEffect(() => {
    // press Esc key to close modal
    const close = (e) => {
      if (e.keyCode === 27) {
        closeAndResetModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {props.state.shouldShowModal && (
        <motion.div
          className={modal_styles.backdrop}
          variants={backdropModal}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div
            className={modal_styles.modal}
            variants={animatedModal}
            initial="initial"
            animate="animate"
          >
            <div className={modal_styles.modal_header}>
              <div>{props.state.isAdding ? "Add new Tool" : "Remove"}</div>
              <div className={modal_styles.close} onClick={closeAndResetModal}>
                <Image
                  src="/Dark_Close_2px.svg"
                  width={18}
                  height={18}
                  className={modal_styles.close}
                />
              </div>
            </div>
            {props.state.isAdding === true ? (
              <form onSubmit={HandleAddTool}>
                <div>
                  <label htmlFor="title" className={modal_styles.field_heading}>
                    Tool Name
                  </label>
                  <motion.div
                    className={
                      modal_styles[
                        `${hasError ? "input_error" : "input_normal"}`
                      ]
                    }
                  >
                    <input
                      id="title"
                      name="title"
                      type="text"
                      autoFocus
                      autoComplete="off"
                      onKeyUp={checkAllFieldsFilled}
                      onChange={validateUniqueName}
                      ref={titleInputRef}
                    />
                    <AnimatePresence exitBeforeEnter>
                      {hasError && (
                        <motion.span
                          variants={errorVariant}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className={modal_styles.error}
                        >
                          Tool already exist
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <label htmlFor="link" className={modal_styles.field_heading}>
                    Tool Link
                  </label>
                  <input
                    id="link"
                    name="link"
                    type="text"
                    ref={linkInputRef}
                    onKeyUp={checkAllFieldsFilled}
                  />
                  <label
                    htmlFor="description"
                    className={modal_styles.field_heading}
                  >
                    Tool description
                  </label>
                  <textarea
                    cols={60}
                    rows={3}
                    id="description"
                    name="description"
                    ref={descriptionInputRef}
                    onKeyUp={checkAllFieldsFilled}
                  />
                  <label htmlFor="tags" className={modal_styles.field_heading}>
                    Tags{" "}
                    {tagHelp && (
                      <span className={modal_styles.help_field}>
                        press SPACE to ADD tag
                      </span>
                    )}
                  </label>
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    ref={tagInputRef}
                    onKeyPress={handleSpace}
                    onKeyUp={checkAllFieldsFilled}
                    onFocus={() => setTagHelp(true)}
                    onBlur={() => setTagHelp(false)}
                  />
                  <div className={modal_styles.tag_list_section}>
                    {tool.tags.length > 0 && (
                      <span className={[modal_styles.help_field].join(" ")}>
                        Click on tagname to remove
                      </span>
                    )}
                    <div className={modal_styles.tag_List}>
                      {tool.tags.map((tag) => (
                        <button
                          key={tag}
                          className={buttons_styles.remove_light}
                          onClick={() => removeTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={modal_styles.footer}>
                    <input
                      type="submit"
                      className={[
                        buttons_styles.add,
                        buttons_styles.button,
                      ].join(" ")}
                      onClick={HandleAddTool}
                      disabled={!allFieldValidated}
                      value="Add tool"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <p>Are you sure you want to remove tool?</p>

                <div className={modal_styles.footer}>
                  <button
                    onClick={() => {
                      props.showModal(false, null, false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={buttons_styles.remove}
                    onClick={() => props.removeTool(props.state.id)}
                  >
                    Yes, remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
