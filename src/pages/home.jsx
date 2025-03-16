import './home.css';

const introText =
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis at augue quis laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse ut leo risus. Duis nec viverra purus. Sed pretium pretium felis, id ullamcorper dui luctus vitae. Nunc euismod ullamcorper quam, et malesuada diam pellentesque quis. Morbi vestibulum nulla sit amet neque imperdiet, a auctor nibh volutpat. Quisque ac ultrices turpis, sed rutrum nisl. Nam non egestas turpis. Ut sed dui ut enim facilisis egestas quis non lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

In ullamcorper lorem id felis interdum fermentum. Quisque malesuada, massa id egestas vulputate, justo massa congue eros, nec lobortis sapien arcu a leo. Integer vitae magna vel neque ultrices ultrices et ac risus. Aenean nunc mi, elementum ac urna ac, aliquet tristique lorem. Duis cursus auctor felis. Donec feugiat nec nunc eget scelerisque. Maecenas venenatis a urna in viverra. Phasellus a turpis eget mi posuere ornare non eu dui. Duis efficitur tempor turpis vitae aliquet. Suspendisse potenti.

Integer elementum porttitor nisl, ac facilisis sapien facilisis vitae. Mauris porta odio eget elit luctus varius. Sed interdum nibh ut nisi euismod fringilla. Maecenas a justo orci. In molestie justo sit amet felis malesuada, id imperdiet ligula vehicula. Fusce porttitor in felis nec semper. Proin ultricies felis risus, quis sagittis mauris feugiat in. Nulla facilisi. Donec bibendum aliquam elit a tempor. Cras libero diam, mollis eget elit quis, pharetra gravida quam. Suspendisse et nulla dolor. Etiam tincidunt accumsan tortor id bibendum. Ut gravida ultrices finibus. Pellentesque porttitor ut tortor at fringilla.

Pellentesque condimentum, augue vitae pellentesque vulputate, dui turpis mollis tellus, gravida lacinia mauris dolor id ex. Nulla id convallis mi. Morbi luctus sapien sed urna dictum, lacinia eleifend purus ullamcorper. Suspendisse non eros ligula. Donec nec magna dolor. Curabitur congue leo in arcu aliquam congue. In sit amet erat nisl. Maecenas sed convallis lacus. Cras consequat tempus leo, nec feugiat metus semper eu. Vivamus mattis tristique ex, non ultrices massa sodales a. Sed commodo risus tortor, ut sodales magna luctus bibendum. Morbi at euismod dui, at imperdiet justo. Ut lacinia est id quam aliquam congue. Pellentesque luctus ullamcorper malesuada. Nam venenatis odio at ante fermentum, non varius justo ornare. Maecenas posuere at lacus at fermentum.

Cras commodo nibh ac risus pulvinar, pulvinar sodales nisl feugiat. Duis id orci dui. Maecenas interdum, eros id porttitor tincidunt, orci sem accumsan metus, dignissim finibus dui sem in dui. Praesent placerat, arcu eget posuere semper, elit nibh pretium velit, eu consequat sem quam id est. Nam ac ante id orci ornare tincidunt a nec tortor. Etiam accumsan ipsum felis, at ullamcorper felis viverra vel. Pellentesque ullamcorper enim non sem scelerisque cursus. Maecenas suscipit tempor arcu at tincidunt.
`

const Home = () => {
    return <div className='home-main'>
      <h2>Welcome to the Spring 2025 Video Game Development Course!</h2>
      {introText.split('\n').map(paragraph =>
        <p>{paragraph}</p>
      )}
    </div>;
};

export default Home;