const constants = {
  methods: ["get", "post", "put", "path", "delete"],
  src_dir: "src",
  api_dir: "api",
  index_file: "index.ts",
  cwd: process.cwd(),
  ucFirst: (str: string) => str[0].toUpperCase() + str.slice(1),
};

export default constants;
