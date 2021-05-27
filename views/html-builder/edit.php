<section>
  <div>
    <textarea name="html" id="html" cols="30" rows="10" class="form-control"></textarea>
  </div>
</section>

<script type="module">
  import prettier from "https://unpkg.com/prettier@2.3.0/esm/standalone.mjs";
  import parserBabel from "https://unpkg.com/prettier@2.3.0/esm/parser-babel.mjs";
  import parserHtml from "https://unpkg.com/prettier@2.3.0/esm/parser-html.mjs";

  console.log(
    prettier.format("const html=/* HTML */ `<DIV> </DIV>`", {
      parser: "babel",
      plugins: [parserBabel, parserHtml],
    })
  );
  // Output: const html = /* HTML */ `<div></div>`;
</script>