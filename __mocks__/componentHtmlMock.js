export const componentHtmlYoutube = {
  displayTitle: 'Sample headline for the HTML Module',
  displayTitleTextAlignment: 'center',
  body: {
    __typename: 'ComponentRichTextBody',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value:
                'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
              marks: [],
              data: {},
            },
          ],
          data: {},
        },
      ],
    },
  },
  bodyTextAlignment: 'center',
  htmlCode: `
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/8C64HgkIyrQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `,
  displayFormat: 'Full-width HTML bottom',
  backgroundColor: 'white',
}

export const componentHtmlHsForm = {
  displayTitle: 'Sample headline for the HTML Module',
  displayTitleTextAlignment: 'center',
  body: {
    __typename: 'ComponentRichTextBody',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value:
                'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
              marks: [],
              data: {},
            },
          ],
          data: {},
        },
      ],
    },
  },
  bodyTextAlignment: 'center',
  htmlCode: `
    <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
    <script>
      hbspt.forms.create({
        region: "na1",
        portalId: "8020079",
        formId: "0d2ba864-d7e6-4b7c-a899-665b2fc0806a"
      });
    </script>
  `,
  displayFormat: 'Full-width HTML bottom',
  backgroundColor: 'white',
}
