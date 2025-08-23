"use client"

function Icon({ name }: { name: string }) {
  return (
    <div className='min-h-[24px]'>
      <img className="object-contain h-full w-auto" src={`/asset/image/icon/${name}.png`} alt={name + (["x", "circle", "triangle"].includes(name) ? " stat" : " type")} />
    </div>
  );
}

export { Icon }
