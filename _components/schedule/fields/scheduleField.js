export default {
    computed: {
      fields() {
        return {
          form: {
            title: {
              name: "title",
              value: null,
              type: "input",
              props: {
                rules: [
                  (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
                ],
                borderless: true,
                label: `*Title`,
                clearable: true,
              },
              label: 'Title',
            },
          },
        };
      },
    },
    methods:{}
  };