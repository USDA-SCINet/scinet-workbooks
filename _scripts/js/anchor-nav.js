const anchor_js_targets = [ "h1", "h2", "h3" ];
const section_class = "usa-layout-docs ";
const exclude_class = "rm-a";

const anchorstring = anchor_js_targets.map((i) => `.${section_class}${i}:not(.${exclude_class})`).join(",");

const PREFIX = "wb";
const CURRENT_CLASS = "usa-current";

const Sanitizer = require("./utils/sanitizer");

const IN_PAGE_NAV_HEADINGS = "h2 h3";
const IN_PAGE_NAV_VALID_HEADINGS = [ "h1", "h2", "h3", "h4", "h5", "h6" ];
const IN_PAGE_NAV_TITLE_TEXT = "On this page";
const IN_PAGE_NAV_TITLE_HEADING_LEVEL = "h4";
const IN_PAGE_NAV_ROOT_MARGIN = "0px 0px 0px 0px";
const IN_PAGE_NAV_THRESHOLD = "1";
const IN_PAGE_NAV_CLASS = `${PREFIX}-in-page-nav`;
const IN_PAGE_NAV_NAV_CLASS = `${IN_PAGE_NAV_CLASS}__nav`;
const IN_PAGE_NAV_LIST_CLASS = `${IN_PAGE_NAV_CLASS}__list`;
const IN_PAGE_NAV_ITEM_CLASS = `${IN_PAGE_NAV_CLASS}__item`;
const IN_PAGE_NAV_PRIMARY_ITEM_CLASS = `${IN_PAGE_NAV_ITEM_CLASS}--primary`;
const IN_PAGE_NAV_LINK_CLASS = `${IN_PAGE_NAV_CLASS}__link`;
const IN_PAGE_NAV_TITLE_CLASS = `${IN_PAGE_NAV_CLASS}__heading`;

/**
 * Set the active link state for the currently observed section
 *
 * @param {HTMLElement} el An element within the in-page nav component
 */
const setActive = (el) => {
  const allLinks = document.querySelectorAll(`.${IN_PAGE_NAV_LINK_CLASS}`);
  el.map((i) => {
    if (i.isIntersecting === true && i.intersectionRatio >= 1) {
      allLinks.forEach((link) => link.classList.remove(CURRENT_CLASS));
      document
        .querySelector(`a[ href="#${i.target.id}" ]`)
        .classList.add(CURRENT_CLASS);
      return true;
    }
    return false;
  });
};

/**
 * Return an array of the designated heading types found in the designated content region.
 * Throw an error if an invalid header element is designated.
 *
 * @param {String} selectedHeadingTypes The list of heading types that should be included in the nav list
 *
 * @return {Array} - An array of designated heading types from the designated content region
 */

const createSectionHeadingTypeArray = (
    selectedHeadingTypes
  ) => {
    // Convert designated headings list to an array
    const selectedHeadingTypesArray = selectedHeadingTypes.indexOf(" ")
      ? selectedHeadingTypes.split(" ")
      : selectedHeadingTypes;
  
    selectedHeadingTypesArray.forEach((headingType) => {
      if (!IN_PAGE_NAV_VALID_HEADINGS.includes(headingType)) {
        throw new Error(
          `In-page navigation: data-header-selector attribute defined with an invalid heading type: "${headingType}".
          Define the attribute with one or more of the following: "${IN_PAGE_NAV_VALID_HEADINGS}".
          Do not use commas or other punctuation in the attribute definition.`
        );
      }
    });
  
    return selectedHeadingTypesArray;
  };

/**
 * Return an array of the visible headings from sectionHeadingsArray.
 * This function removes headings that are hidden with display:none or visibility:none style rules.
 * These items will be added to the component nav list.
 *
 * @param {Array} selectnavanchors The selected navanchors from anchor_js
 * @param {String} selectedHeadingTypes The list of heading types that should be included in the nav list
 *
 * @return {Array} - An array of visible headings from the designated content region
 */

const getVisibleSectionHeadings = (
    selectnavanchors,
    selectedHeadingTypes
) => {

    const sectionHeadingsTypes = createSectionHeadingTypeArray(
        selectedHeadingTypes
      );

  // Find all headings with hidden styling and remove them from the array
  const visibleSectionHeadings = selectnavanchors.filter((heading) => {
    const headingName = heading.localName;
    const headingStyle = window.getComputedStyle(heading);
    const visibleHeading =
      headingStyle.getPropertyValue("display") !== "none" &&
      headingStyle.getPropertyValue("visibility") !== "hidden" &&
      sectionHeadingsTypes.includes(headingName);

    return visibleHeading;
  });

  return visibleSectionHeadings;
}; 

/**
 * Return the highest-level header tag included in the link list
 *
 * @param {HTMLElement} sectionHeadings The array of headings selected for inclusion in the link list
 *
 * @return {tagName} - The tag name for the highest level of header in the link list
 */

const getTopLevelHeading = (sectionHeadings) => {
  const topHeading = sectionHeadings[ 0 ].tagName.toLowerCase();
  return topHeading;
};

/**
 * Create the in-page navigation component
 *
 * @param {HTMLElement} inPageNavEl The in-page nav element
 */
const createInPageNav = (inPageNavEl) => {

  // Adding anchor links to headers on docs layouts only
  anchors.add(anchorstring);
  const navanchors = anchors.elements;

  const inPageNavTitleText = Sanitizer.escapeHTML`${
    inPageNavEl.dataset.titleText || IN_PAGE_NAV_TITLE_TEXT
  }`;
  const inPageNavTitleHeadingLevel = Sanitizer.escapeHTML`${
    inPageNavEl.dataset.titleHeadingLevel || IN_PAGE_NAV_TITLE_HEADING_LEVEL
  }`;
  const inPageNavRootMargin = Sanitizer.escapeHTML`${
    inPageNavEl.dataset.rootMargin || IN_PAGE_NAV_ROOT_MARGIN
  }`;
  const inPageNavThreshold = Sanitizer.escapeHTML`${
    inPageNavEl.dataset.threshold || IN_PAGE_NAV_THRESHOLD
  }`;
  const inPageNavHeadingSelector = Sanitizer.escapeHTML`${
    inPageNavEl.dataset.headingElements || IN_PAGE_NAV_HEADINGS
  }`;

  const options = {
    root: null,
    rootMargin: inPageNavRootMargin,
    threshold: [ inPageNavThreshold ],
  };

  const sectionHeadings = getVisibleSectionHeadings(
    navanchors,
    inPageNavHeadingSelector
  );

  const inPageNav = document.createElement("nav");
  inPageNav.setAttribute("aria-label", inPageNavTitleText);
  inPageNav.classList.add(IN_PAGE_NAV_NAV_CLASS);

  const inPageNavTitle = document.createElement(inPageNavTitleHeadingLevel);
  inPageNavTitle.classList.add(IN_PAGE_NAV_TITLE_CLASS);
  inPageNavTitle.setAttribute("tabindex", "0");
  inPageNavTitle.textContent = inPageNavTitleText;
  inPageNav.appendChild(inPageNavTitle);

  const inPageNavList = document.createElement("ul");
  inPageNavList.classList.add(IN_PAGE_NAV_LIST_CLASS);
  inPageNav.appendChild(inPageNavList);

  sectionHeadings.forEach((el) => {
    const listItem = document.createElement("li");
    const navLinks = document.createElement("a");
    const textContentOfLink = el.textContent;
    const tag = el.querySelector('.anchorjs-link').getAttribute('href');
    const topHeadingLevel = getTopLevelHeading(sectionHeadings);
    const headingId = el.querySelector('.anchorjs-link').getAttribute('href');

    listItem.classList.add(IN_PAGE_NAV_ITEM_CLASS);

    if (tag === topHeadingLevel) {
      listItem.classList.add(IN_PAGE_NAV_PRIMARY_ITEM_CLASS);
    }

    navLinks.setAttribute("href", `${headingId}`);
    navLinks.setAttribute("class", IN_PAGE_NAV_LINK_CLASS);
    navLinks.textContent = textContentOfLink;

    inPageNavList.appendChild(listItem);
    listItem.appendChild(navLinks);
  });

  inPageNavEl.appendChild(inPageNav);

  const anchorTags = sectionHeadings;
  const observeSections = new window.IntersectionObserver(setActive, options);

  anchorTags.forEach((tag) => {
    observeSections.observe(tag);
  });
};


function generateTableOfContents(){
  document.querySelectorAll(`.${IN_PAGE_NAV_CLASS}`).forEach((inPageNavEl) => {
    createInPageNav(inPageNavEl);
  });
}

module.exports = generateTableOfContents;