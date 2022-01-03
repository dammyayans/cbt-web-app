import {ItableStyle} from 'react-tailwind-table';
const tableStyling: ItableStyle = {
  base_bg_color: 'bg-primary',
  base_text_color: 'text-primary',
  main: 'noboxshadow',
  top: {
    // title:"text-red-700"
    elements: {
      main: 'flew-row-im item-center',
      search:
        'px-6 pt-3 pb-2 text-xs border bg-white border-border-gray rounded-[10px] outline-none w-full',
      bulk_select: {
        // main:"bg-green-700 text-white",
        button: '',
      },
      export: 'text-primary',
    },
  },
  table_head: {
    table_row: 'bg-lightblue text-black rounded-[15px]',
    table_data: 'text-black py-[20px]',
  },
  table_body: {
    main: 'bg-white',
    table_row: 'text-black border-b-[1px] border-b-[#C6C5E0]',
    table_data: 'text-base',
  },
  footer: {
    main: 'table-footer-main',
    statistics: {
      main: 'bg-white text-black font-thin',
      bold_numbers: 'text-black font-bold',
    },
    page_numbers: 'bg-lightblue text-black px-2',
  },
};

export default tableStyling;
