export const shortText = (text: string, size: number) => {
  if (!(text.length > size)) {
    return text;
  } else {
    return `
    ${text.substring(0, size)}
      <span class='dropdown dropdown-left dropdown-top' title='show more'>
        <label
          tabindex=0
          class=' text-xs max-h-8 text-info cursor-pointer pl-1 hover:text-indigo-400'
        >
          more
        </label>
        <div
          tabindex=0
          class='card compact dropdown-content text-basic z-[1] shadow bg-slate-700 rounded-box w-[500px]'
        >
          <div class='card-body text-slate-50' title='description'>
            <p>${text}</p>
          </div>
        </div>
      </span>
      `;
  }
};

