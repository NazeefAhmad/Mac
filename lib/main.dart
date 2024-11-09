// //
// //
// // import 'dart:ui';
// // import 'package:flutter/material.dart';
// //
// // void main() {
// //   runApp(MaterialApp(
// //     home: FloatingDockExample(),
// //   ));
// // }
// //
// // class FloatingDockDesktop extends StatefulWidget {
// //   final List<DockItem> items;
// //
// //   const FloatingDockDesktop({
// //     Key? key,
// //     required this.items,
// //   }) : super(key: key);
// //
// //   @override
// //   _FloatingDockDesktopState createState() => _FloatingDockDesktopState();
// // }
// //
// // class _FloatingDockDesktopState extends State<FloatingDockDesktop> {
// //   double mouseX = double.infinity;
// //   double containerWidth = 0.5;
// //
// //   List<DockItem> currentItems = [];
// //
// //   @override
// //   void initState() {
// //     super.initState();
// //     currentItems = List.from(widget.items);
// //   }
// //
// //   @override
// //   Widget build(BuildContext context) {
// //     return MouseRegion(
// //       onHover: (event) {
// //         setState(() {
// //           mouseX = event.position.dx;
// //           containerWidth = lerpDouble(0.5, 0.8, event.position.dx / MediaQuery.of(context).size.width)!;
// //         });
// //       },
// //       onExit: (_) {
// //         setState(() {
// //           mouseX = double.infinity;
// //           containerWidth = 0.5;
// //         });
// //       },
// //       child: BackdropFilter(
// //         filter: ImageFilter.blur(sigmaX: 6.0, sigmaY: 6.0),
// //         child: AnimatedContainer(
// //           duration: Duration(milliseconds: 300),
// //           width: MediaQuery.of(context).size.width * containerWidth,
// //           padding: EdgeInsets.all(16.0),
// //           decoration: BoxDecoration(
// //             color: Colors.black.withOpacity(0.04),
// //             borderRadius: BorderRadius.circular(16),
// //           ),
// //           child: Row(
// //             mainAxisAlignment: MainAxisAlignment.center,
// //             children: _getItemsWithSpacing(context),
// //           ),
// //         ),
// //       ),
// //     );
// //   }
// //
// //   List<Widget> _getItemsWithSpacing(BuildContext context) {
// //     double screenWidth = MediaQuery.of(context).size.width;
// //     double adjustedWidth = screenWidth * containerWidth;
// //     double spacing = adjustedWidth * 0.02;
// //
// //     List<Widget> iconWidgets = [];
// //
// //     for (int i = 0; i < currentItems.length; i++) {
// //       iconWidgets.add(
// //         DragTarget<int>(
// //           onAccept: (index) {
// //             setState(() {
// //               final movedItem = currentItems.removeAt(index);
// //               currentItems.insert(i, movedItem);
// //             });
// //           },
// //           builder: (context, candidateData, rejectedData) {
// //             return Draggable<int>(
// //               data: i,
// //               childWhenDragging: IconContainer(item: currentItems[i], mouseX: mouseX),
// //               feedback: Material(
// //                 color: Colors.transparent,
// //                 child: IconContainer(item: currentItems[i], mouseX: mouseX),
// //               ),
// //               child: IconContainer(item: currentItems[i], mouseX: mouseX),
// //             );
// //           },
// //         ),
// //       );
// //       if (i < currentItems.length - 1) {
// //         iconWidgets.add(SizedBox(width: spacing));
// //       }
// //     }
// //
// //     return iconWidgets;
// //   }
// // }
// //
// // class IconContainer extends StatelessWidget {
// //   final DockItem item;
// //   final double mouseX;
// //
// //   const IconContainer({
// //     Key? key,
// //     required this.item,
// //     required this.mouseX,
// //   }) : super(key: key);
// //
// //   @override
// //   Widget build(BuildContext context) {
// //     double distance = 100;
// //
// //     try {
// //       final RenderBox box = context.findRenderObject() as RenderBox;
// //       final offset = box.localToGlobal(Offset.zero);
// //       distance = (mouseX - offset.dx).abs();
// //     } catch (e) {}
// //
// //     final double size = (distance < 150) ? (120 - (distance * 0.3)).clamp(60, 120).toDouble() : 60.0;
// //
// //     return AnimatedContainer(
// //       duration: Duration(milliseconds: 300),
// //       width: size,
// //       height: size,
// //       decoration: BoxDecoration(
// //         color: Colors.transparent,
// //         shape: BoxShape.rectangle,
// //         boxShadow: [
// //           BoxShadow(
// //             color: Colors.transparent,
// //             blurRadius: 8,
// //             spreadRadius: 2,
// //             offset: Offset(0, 4),
// //           ),
// //         ],
// //       ),
// //       child: Center(
// //         child: Transform.scale(
// //           scale: size / 80,
// //           child: Image.asset(
// //             item.iconPath,
// //             width: size,
// //             height: size,
// //           ),
// //         ),
// //       ),
// //     );
// //   }
// // }
// //
// // class DockItem {
// //   final String iconPath;
// //
// //   DockItem(this.iconPath);
// // }
// //
// // class FloatingDockExample extends StatelessWidget {
// //   @override
// //   Widget build(BuildContext context) {
// //     return Scaffold(
// //       backgroundColor: Colors.white,
// //       body: Center(
// //         child: Container(
// //           width: MediaQuery.of(context).size.width * 0.5,
// //           child: FloatingDockDesktop(
// //             items: [
// //               DockItem('assets/icon_home.png'),
// //               DockItem('assets/icon_search.png'),
// //               DockItem('assets/icon_settings.png'),
// //               DockItem('assets/icon_contact.png'),
// //               DockItem('assets/icon_camera.png'),
// //             ],
// //           ),
// //         ),
// //       ),
// //     );
// //   }
// // }
//
//
import 'dart:ui';
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: FloatingDockExample(),
  ));
}

class FloatingDockDesktop extends StatefulWidget {
  final List<DockItem> items;

  const FloatingDockDesktop({
    Key? key,
    required this.items,
  }) : super(key: key);

  @override
  _FloatingDockDesktopState createState() => _FloatingDockDesktopState();
}

class _FloatingDockDesktopState extends State<FloatingDockDesktop> {
  double mouseX = double.infinity;
  double containerWidth = 0.5;

  List<DockItem> currentItems = [];
  List<GlobalKey> itemKeys = [];

  @override
  void initState() {
    super.initState();
    currentItems = List.from(widget.items);
    itemKeys = List.generate(currentItems.length, (_) => GlobalKey());
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: (event) {
        setState(() {
          mouseX = event.position.dx;
          containerWidth = lerpDouble(0.5, 0.8, event.position.dx / MediaQuery.of(context).size.width)!;
        });
      },
      onExit: (_) {
        setState(() {
          mouseX = double.infinity;
          containerWidth = 0.5;
        });
      },
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 6.0, sigmaY: 6.0),
        child: AnimatedContainer(
          duration: Duration(milliseconds: 300),
          width: MediaQuery.of(context).size.width * containerWidth,
          padding: EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.04),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: _getItemsWithSpacing(context),
          ),
        ),
      ),
    );
  }

  List<Widget> _getItemsWithSpacing(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double adjustedWidth = screenWidth * containerWidth;
    double spacing = adjustedWidth * 0.02;

    List<Widget> iconWidgets = [];

    for (int i = 0; i < currentItems.length; i++) {
      if (i > 0) {
        iconWidgets.add(SizedBox(width: spacing));
      }

      iconWidgets.add(
        DragTarget<int>(
          onAccept: (index) {
            setState(() {
              final movedItem = currentItems.removeAt(index);
              currentItems.insert(i, movedItem);
            });
          },
          builder: (context, candidateData, rejectedData) {
            return Draggable<int>(
              data: i,
              feedback: Material(
                color: Colors.transparent,
                child: IconContainer(
                  item: currentItems[i],
                  mouseX: mouseX,
                  containerKey: itemKeys[i],
                ),
              ),
              childWhenDragging: Container(
                width: 60,
                height: 60,
              ),
              child: IconContainer(
                item: currentItems[i],
                mouseX: mouseX,
                containerKey: itemKeys[i],
              ),
            );
          },
        ),
      );
    }

    return iconWidgets;
  }
}

class IconContainer extends StatelessWidget {
  final DockItem item;
  final double mouseX;
  final GlobalKey containerKey;

  const IconContainer({
    Key? key,
    required this.item,
    required this.mouseX,
    required this.containerKey,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double distance = 100;

    try {
      final RenderBox? box = containerKey.currentContext?.findRenderObject() as RenderBox?;
      if (box != null) {
        final offset = box.localToGlobal(Offset.zero);
        distance = (mouseX - offset.dx).abs();
      }
    } catch (e) {}

    final double size = (distance < 150) ? (120 - (distance * 0.3)).clamp(60, 120).toDouble() : 60.0;

    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: Colors.transparent,
        shape: BoxShape.rectangle,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.transparent.withOpacity(0.1),
            blurRadius: 8,
            spreadRadius: 2,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Center(
        child: Transform.scale(
          scale: size / 80,
          child: Image.asset(
            item.iconPath,
            width: 60,
            height: 60,
            //fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}

class DockItem {
  final String iconPath;

  DockItem(this.iconPath);
}

class FloatingDockExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Colors.blue.withOpacity(0.1),
                Colors.purple.withOpacity(0.1),
              ],
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              FloatingDockDesktop(
                items: [
                  DockItem('assets/icon_home.png'),
                  DockItem('assets/icon_search.png'),
                  DockItem('assets/icon_settings.png'),
                  DockItem('assets/icon_contact.png'),
                  DockItem('assets/icon_camera.png'),
                ],
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}