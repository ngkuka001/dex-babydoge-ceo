import { FC } from 'react';

const IconCopy: FC<any> = (props) => {
  return (
    <svg width={16} height={16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.334.833h-10c-.917 0-1.667.75-1.667 1.667v11.666h1.667V2.5h10V.833zm2.5 3.333H6.667C5.75 4.166 5 4.916 5 5.833V17.5c0 .916.75 1.666 1.667 1.666h9.167c.916 0 1.666-.75 1.666-1.666V5.833c0-.917-.75-1.667-1.666-1.667zm0 13.334H6.667V5.833h9.167V17.5z"
        fill="#BE8F30"
      />
    </svg>
  );
};

export default IconCopy;
