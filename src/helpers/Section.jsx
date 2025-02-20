export default function Section({ top, children }) {
    return (
        <div
            className="absolute left-0 right-0 flex justify-center"
            style={{
                top: top,
            }}
        >
            {children}
        </div>
    );
}
