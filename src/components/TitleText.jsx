export default function TitleText({text}) {
    return (
        <div className="TitleText text-green-500 max-w-md mx-auto mt-8">
            <h1 className="sm:text-xl lg:text-4xl font-bold text-center">{text}</h1>
        </div>
    );
}