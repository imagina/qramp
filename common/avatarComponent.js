export const avatarComponent = (src, name) => {
	return (`
		<div class="tw-flex tw-items-center tw-gap-2.5 tw-w-full">
      ${
        src ? (
          `
            <figure class="tw-w-7 tw-h-7">
              <img
                class="tw-w-7 tw-h-7 tw-rounded-full tw-object-cover" 
                src="${src}" 
              />
            </figure>
          `
        ) : (
          `
          <div class="tw-flex tw-items-center tw-justify-center tw-w-7 tw-h-7 tw-bg-gray-100 tw-rounded-full">
            <i class="fa-light fa-plane-tail tw-text-lg tw-text-gray-400"></i>
          </div>
          `
        )
      }
			<span class="tw-truncate">${name}</span>
		</div>
	`)
}